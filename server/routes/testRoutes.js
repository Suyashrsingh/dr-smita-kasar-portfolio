const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/tests (Public: published tests; Admin: all tests)
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.headers.authorization ? true : false;
    const tests = await store.getTests(isAdmin);
    // Sanitize questions for public view (omit correctAnswer until submitted)
    const sanitized = tests.map(t => {
      const obj = t.toObject ? t.toObject() : { ...t };
      if (!isAdmin && obj.questions) {
        obj.questions = obj.questions.map(({ correctAnswer, explanation, ...qRest }) => qRest);
      }
      return obj;
    });
    return res.json({ success: true, count: sanitized.length, data: sanitized });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/tests/submissions/all (Protected: Admin view all quiz submissions)
router.get('/submissions/all', requireAuth, async (req, res) => {
  try {
    const submissions = await store.getAllTestSubmissions();
    return res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/tests/:id/submissions (Protected: Admin view submissions for a specific test)
router.get('/:id/submissions', requireAuth, async (req, res) => {
  try {
    const submissions = await store.getTestSubmissions(req.params.id);
    return res.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/tests/:id/export-csv (Protected: Export submissions as CSV for Excel)
router.get('/:id/export-csv', requireAuth, async (req, res) => {
  try {
    const test = await store.getTestById(req.params.id);
    const submissions = await store.getTestSubmissions(req.params.id);
    
    // Build CSV Content
    const headers = ['Sr No', 'Student Name', 'Class / Branch', 'Roll No / PRN', 'Email', 'Score', 'Total Marks', 'Percentage (%)', 'Status', 'Time Spent (Sec)', 'Submission Date'];
    const rows = submissions.map((sub, idx) => [
      idx + 1,
      `"${(sub.studentName || '').replace(/"/g, '""')}"`,
      `"${(sub.studentClass || '').replace(/"/g, '""')}"`,
      `"${(sub.rollNo || '').replace(/"/g, '""')}"`,
      `"${(sub.studentEmail || '').replace(/"/g, '""')}"`,
      sub.score,
      sub.totalPossible,
      `${sub.percentage}%`,
      sub.passed ? 'PASSED' : 'NEEDS REVIEW',
      sub.timeSpentSeconds || 0,
      `"${new Date(sub.submittedAt || sub.createdAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const safeTitle = (test?.title || 'Quiz_Results').replace(/[^a-zA-Z0-9_-]/g, '_');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}_Submissions.csv"`);
    return res.send(csvContent);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/tests/submissions/:subId (Protected: Delete a submission)
router.delete('/submissions/:subId', requireAuth, async (req, res) => {
  try {
    await store.deleteTestSubmission(req.params.subId);
    return res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/tests/:id
router.get('/:id', async (req, res) => {
  try {
    const test = await store.getTestById(req.params.id);
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
    
    const isAdmin = req.headers.authorization ? true : false;
    const obj = test.toObject ? test.toObject() : { ...test };
    if (!isAdmin && obj.questions) {
      obj.questions = obj.questions.map(({ correctAnswer, explanation, ...qRest }) => qRest);
    }
    return res.json({ success: true, data: obj });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/tests/:id/submit (Public: Student submits test answers with their identity)
router.post('/:id/submit', async (req, res) => {
  try {
    const { answers, studentName, studentClass, rollNo, studentEmail, timeSpentSeconds } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Please provide answers array.' });
    }
    if (!studentName || !studentClass || !rollNo) {
      return res.status(400).json({ success: false, message: 'Please provide student name, class, and roll number.' });
    }
    const result = await store.submitTest(req.params.id, answers, {
      studentName,
      studentClass,
      rollNo,
      studentEmail,
      timeSpentSeconds
    });
    if (!result) return res.status(404).json({ success: false, message: 'Test not found' });
    return res.json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/tests (Protected: Admin create test)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { 
      title, 
      subject, 
      description, 
      targetAudience, 
      durationMinutes, 
      passMarks, 
      isPublished, 
      isScheduled,
      startTime,
      endTime,
      targetClass,
      questions 
    } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ success: false, message: 'Please provide title and subject.' });
    }

    const created = await store.createTest({
      title,
      subject,
      description,
      targetAudience: targetAudience || 'UG / PG Scholars',
      durationMinutes: Number(durationMinutes) || 15,
      passMarks: Number(passMarks) || 3,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      isScheduled: Boolean(isScheduled),
      startTime: startTime ? new Date(startTime) : null,
      endTime: endTime ? new Date(endTime) : null,
      targetClass: targetClass || 'All Classes / CSE',
      questions: questions || []
    });
    return res.status(201).json({ success: true, message: 'Test assessment created successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/tests/:id (Protected: Admin edit test)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await store.updateTest(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Test not found' });
    return res.json({ success: true, message: 'Test updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/tests/:id/toggle-publish (Protected: Toggle Publish/Draft)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishTest(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Test not found' });
    return res.json({ success: true, message: `Test is now ${updated.isPublished ? 'Published' : 'Draft/Unpublished'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/tests/:id (Protected: Admin delete test)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteTest(req.params.id);
    return res.json({ success: true, message: 'Test deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

