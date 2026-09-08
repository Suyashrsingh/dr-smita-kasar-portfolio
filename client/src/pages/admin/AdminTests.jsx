import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Clock, 
  Award, 
  CheckCircle2, 
  X, 
  ListPlus, 
  HelpCircle,
  Download,
  Users,
  Calendar,
  Timer,
  Search,
  Check,
  XCircle,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';
import { testService } from '../../services/api';
import { initialTests } from '../../data/fallbackData';

const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  // Submissions Modal State
  const [submissionsModalOpen, setSubmissionsModalOpen] = useState(false);
  const [currentTestSubmissions, setCurrentTestSubmissions] = useState([]);
  const [selectedTestForSubs, setSelectedTestForSubs] = useState(null);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subSearch, setSubSearch] = useState('');

  const initialForm = {
    title: '',
    subject: 'Artificial Intelligence & Machine Learning',
    description: '',
    targetAudience: 'UG / PG Scholars',
    targetClass: 'All Classes / CSE',
    durationMinutes: 15,
    passMarks: 3,
    isPublished: true,
    isScheduled: false,
    startTime: '',
    endTime: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        marks: 1
      }
    ]
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await testService.getAll();
      if (res.data.success) {
        setTests(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load tests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const openCreateModal = () => {
    setEditingTest(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTest(t);
    setFormData({
      title: t.title || '',
      subject: t.subject || '',
      description: t.description || '',
      targetAudience: t.targetAudience || 'UG / PG Scholars',
      targetClass: t.targetClass || 'All Classes / CSE',
      durationMinutes: t.durationMinutes || 15,
      passMarks: t.passMarks || 3,
      isPublished: t.isPublished !== false,
      isScheduled: Boolean(t.isScheduled),
      startTime: t.startTime ? new Date(t.startTime).toISOString().slice(0, 16) : '',
      endTime: t.endTime ? new Date(t.endTime).toISOString().slice(0, 16) : '',
      questions: t.questions && t.questions.length > 0 ? t.questions : initialForm.questions
    });
    setModalOpen(true);
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await testService.togglePublish(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchTests();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to update publish status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this test assessment?')) return;
    setTests(prev => prev.filter(t => (t.id || t._id) !== id));
    try {
      await testService.delete(id);
      setStatusMsg({ type: 'success', text: 'Test deleted successfully.' });
      fetchTests();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete test.' });
      fetchTests();
    }
  };

  // Open Student Submissions Modal
  const openSubmissionsModal = async (test) => {
    setSelectedTestForSubs(test);
    setSubmissionsModalOpen(true);
    setLoadingSubs(true);
    setSubSearch('');
    try {
      const testId = test.id || test._id;
      const res = await testService.getSubmissions(testId);
      if (res.data.success) {
        setCurrentTestSubmissions(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
      setCurrentTestSubmissions([]);
    } finally {
      setLoadingSubs(false);
    }
  };

  // Delete Individual Submission
  const handleDeleteSubmission = async (subId) => {
    if (!window.confirm('Delete this student submission record?')) return;
    try {
      await testService.deleteSubmission(subId);
      setCurrentTestSubmissions(prev => prev.filter(s => s.id !== subId && s._id !== subId));
      setStatusMsg({ type: 'success', text: 'Student submission removed.' });
      fetchTests();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete submission.' });
    }
  };

  // Export to Excel / CSV File Download
  const handleExportCSV = (test, submissions) => {
    if (!submissions || submissions.length === 0) {
      alert('No student submissions found to export.');
      return;
    }

    const headers = [
      'Sr No',
      'Student Name',
      'Class & Branch',
      'Roll No / PRN',
      'Email',
      'Score',
      'Total Marks',
      'Percentage (%)',
      'Status (Pass/Fail)',
      'Time Spent (Sec)',
      'Submitted Date & Time'
    ];

    const rows = submissions.map((sub, idx) => [
      idx + 1,
      `"${(sub.studentName || '').replace(/"/g, '""')}"`,
      `"${(sub.studentClass || '').replace(/"/g, '""')}"`,
      `"${(sub.rollNo || '').replace(/"/g, '""')}"`,
      `"${(sub.studentEmail || '').replace(/"/g, '""')}"`,
      sub.score ?? 0,
      sub.totalPossible ?? 0,
      `${sub.percentage ?? 0}%`,
      sub.passed ? 'PASSED' : 'NEEDS REVIEW',
      sub.timeSpentSeconds || 0,
      `"${new Date(sub.submittedAt || sub.createdAt).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const safeTitle = (test?.title || 'Quiz_Submissions').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.setAttribute('download', `${safeTitle}_Student_Scores_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Question editing helpers
  const handleAddQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: '',
          marks: 1
        }
      ]
    }));
  };

  const handleRemoveQuestion = (qIdx) => {
    if (formData.questions.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== qIdx)
    }));
  };

  const handleQuestionChange = (qIdx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.questions];
      updated[qIdx] = { ...updated[qIdx], [field]: val };
      return { ...prev, questions: updated };
    });
  };

  const handleOptionChange = (qIdx, optIdx, val) => {
    setFormData(prev => {
      const updated = [...prev.questions];
      const opts = [...updated[qIdx].options];
      opts[optIdx] = val;
      updated[qIdx] = { ...updated[qIdx], options: opts };
      return { ...prev, questions: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clean and sanitize questions before submitting
      const cleanQuestions = (formData.questions || [])
        .map(q => {
          const opts = (q.options || []).map(o => String(o || '').trim()).filter(Boolean);
          return {
            question: String(q.question || '').trim(),
            options: opts.length >= 2 ? opts : (opts.length === 1 ? [...opts, 'N/A'] : ['Option A', 'Option B']),
            correctAnswer: Math.min(Math.max(0, Number(q.correctAnswer) || 0), Math.max(0, (opts.length || 2) - 1)),
            explanation: String(q.explanation || '').trim(),
            marks: Number(q.marks) || 1
          };
        })
        .filter(q => q.question);

      const payload = {
        ...formData,
        questions: cleanQuestions,
        startTime: formData.isScheduled && formData.startTime ? new Date(formData.startTime) : null,
        endTime: formData.isScheduled && formData.endTime ? new Date(formData.endTime) : null
      };

      if (editingTest) {
        const id = editingTest.id || editingTest._id;
        await testService.update(id, payload);
        setStatusMsg({ type: 'success', text: 'Test assessment updated successfully!' });
      } else {
        await testService.create(payload);
        setStatusMsg({ type: 'success', text: 'New test assessment published successfully!' });
      }
      setModalOpen(false);
      fetchTests();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Error saving test.';
      setStatusMsg({ type: 'error', text: `Failed to save test: ${errMsg}` });
    }
  };

  const filteredSubmissions = currentTestSubmissions.filter(s => 
    s.studentName?.toLowerCase().includes(subSearch.toLowerCase()) ||
    s.rollNo?.toLowerCase().includes(subSearch.toLowerCase()) ||
    s.studentClass?.toLowerCase().includes(subSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Online Tests & Student Assessment Central
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create scheduled or live exams, view student submissions (Name, Class, Roll No), and download Excel (.csv) score sheets.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assessment</span>
        </button>
      </div>

      {statusMsg && (
        <div className={`p-3.5 rounded-xl text-xs flex items-center justify-between mac-card ${
          statusMsg.type === 'success' ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300' : 'border-rose-500/50 text-rose-700 dark:text-rose-300'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Tests List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-academic-500 mb-3" />
          <p className="text-sm font-medium">Loading assessments from database...</p>
        </div>
      ) : tests.length === 0 ? (
        <div className="mac-card rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-academic-500/10 text-academic-500 flex items-center justify-center">
            <FileCheck className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Assessments Created Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create online multiple-choice quizzes and timed assessments for your students to test their knowledge.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md cursor-pointer hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Your First Assessment</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => {
            const id = test.id || test._id;
            return (
              <div
                key={id}
                className="mac-card rounded-3xl p-6 space-y-4 flex flex-col justify-between shadow-sm hover:border-academic-500/50 transition-all"
              >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-academic-500/10 text-academic-700 dark:text-academic-300 border border-academic-500/20">
                    {test.subject}
                  </span>

                  <div className="flex items-center gap-2">
                    {test.isScheduled && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                        Scheduled
                      </span>
                    )}

                    {/* Publish Status Toggle Badge */}
                    <button
                      onClick={() => handleTogglePublish(id)}
                      title="Click to toggle publish status"
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        test.isPublished !== false
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {test.isPublished !== false ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {test.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {test.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                  <span>{test.questions?.length || 0} Questions</span>
                  <span>•</span>
                  <span>{test.durationMinutes} Mins</span>
                  <span>•</span>
                  <span>Target: {test.targetClass || 'All CSE'}</span>
                </div>

                {test.isScheduled && test.startTime && (
                  <div className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[11px] space-y-1">
                    <div className="text-slate-600 dark:text-slate-400">
                      <strong>Window Opens:</strong> {new Date(test.startTime).toLocaleString()}
                    </div>
                    {test.endTime && (
                      <div className="text-slate-600 dark:text-slate-400">
                        <strong>Window Closes:</strong> {new Date(test.endTime).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submissions & Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => openSubmissionsModal(test)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-academic-500/10 text-academic-700 dark:text-academic-300 border border-academic-500/20 hover:bg-academic-500/20 cursor-pointer transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{test.submissionsCount || 0} Submissions</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(test)}
                    className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* STUDENT SUBMISSIONS MODAL & EXCEL EXPORT */}
      {submissionsModalOpen && selectedTestForSubs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] mac-card rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 gap-3">
              <div className="flex items-center gap-3">
                <div className="mac-traffic-lights">
                  <span className="mac-dot red" onClick={() => setSubmissionsModalOpen(false)} />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Student Submissions: {selectedTestForSubs.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Total Attempts: {currentTestSubmissions.length} • Passing Marks: {selectedTestForSubs.passMarks}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportCSV(selectedTestForSubs, currentTestSubmissions)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer transition-all"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Download Excel (.csv)</span>
                </button>
                
                <button
                  onClick={() => setSubmissionsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Submissions Search Bar */}
            <div className="p-4 border-b border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-black/20">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={subSearch}
                  onChange={(e) => setSubSearch(e.target.value)}
                  placeholder="Filter by student name, roll number, or class..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Submissions Table Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {loadingSubs ? (
                <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs text-slate-500">
                  <Loader2 className="w-6 h-6 animate-spin text-academic-600" />
                  <span>Loading student scores...</span>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No student submissions recorded yet for this test assessment.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                        <th className="p-3">#</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Roll No / PRN</th>
                        <th className="p-3">Class & Branch</th>
                        <th className="p-3">Score</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Submitted At</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80 dark:divide-white/10">
                      {filteredSubmissions.map((sub, sIdx) => {
                        const subId = sub.id || sub._id;
                        return (
                          <tr key={subId} className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                            <td className="p-3 font-mono text-slate-400">{sIdx + 1}</td>
                            <td className="p-3 font-bold text-slate-900 dark:text-white">
                              {sub.studentName}
                            </td>
                            <td className="p-3 font-mono text-academic-600 dark:text-academic-400">
                              {sub.rollNo}
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">
                              {sub.studentClass}
                            </td>
                            <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                              {sub.score} / {sub.totalPossible} ({sub.percentage}%)
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                sub.passed 
                                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                              }`}>
                                {sub.passed ? 'PASSED' : 'NEEDS REVIEW'}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500 font-mono text-[11px]">
                              {new Date(sub.submittedAt || sub.createdAt).toLocaleString()}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => handleDeleteSubmission(subId)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                                title="Delete submission"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Showing {filteredSubmissions.length} of {currentTestSubmissions.length} records
              </span>

              <button
                onClick={() => setSubmissionsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold mac-btn-glass text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                Close Submissions
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Test Creator / Editor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-3xl w-full max-h-[90vh] mac-card rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
              <div className="mac-traffic-lights">
                <span className="mac-dot red" onClick={() => setModalOpen(false)} />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {editingTest ? 'Edit Test Assessment & Questions' : 'Create New Online Test Assessment'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              
              {/* Test Meta */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Test Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g. Unit 3 Assessment: Convolutional Neural Networks & Computer Vision"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Subject Domain *</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="e.g. Deep Learning / AI"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Duration (Minutes)</label>
                    <input
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Passing Marks</label>
                    <input
                      type="number"
                      value={formData.passMarks}
                      onChange={(e) => setFormData({ ...formData, passMarks: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target Class / Branch</label>
                    <input
                      type="text"
                      value={formData.targetClass}
                      onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                      placeholder="e.g. BE CSE Div A & B / TE IT"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target Audience Description</label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                      placeholder="e.g. Final Year Engineering Students"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Description & Instructions</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide syllabus scope, grading criteria, and test instructions..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white resize-none"
                  />
                </div>

                {/* SCHEDULING CONTROLS */}
                <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="scheduleToggle"
                      checked={formData.isScheduled}
                      onChange={(e) => setFormData({ ...formData, isScheduled: e.target.checked })}
                      className="w-4 h-4 rounded text-academic-600"
                    />
                    <label htmlFor="scheduleToggle" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                      Schedule Live Assessment Window (Opens & Closes at Specific Times)
                    </label>
                  </div>

                  {formData.isScheduled && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600 dark:text-slate-400">Live Window Start (Date & Time)</label>
                        <input
                          type="datetime-local"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-600 dark:text-slate-400">Live Window End (Date & Time)</label>
                        <input
                          type="datetime-local"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="testPublishToggle"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-academic-600"
                  />
                  <label htmlFor="testPublishToggle" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Publish this test to live student portal
                  </label>
                </div>
              </div>

              {/* Questions Builder */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Questions ({formData.questions.length})
                  </h4>

                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold mac-btn-primary text-white cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Question</span>
                  </button>
                </div>

                {formData.questions.map((q, qIdx) => (
                  <div 
                    key={qIdx}
                    className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-academic-600 font-mono">
                        Question #{qIdx + 1}
                      </span>
                      {formData.questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIdx)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-semibold cursor-pointer"
                        >
                          Remove Question
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(qIdx, 'question', e.target.value)}
                      required
                      placeholder={`Enter question #${qIdx + 1}...`}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />

                    {/* 4 Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correctAnswer-${qIdx}`}
                            checked={Number(q.correctAnswer) === optIdx}
                            onChange={() => handleQuestionChange(qIdx, 'correctAnswer', optIdx)}
                            title="Mark as correct answer"
                            className="w-4 h-4 text-emerald-600"
                          />
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                            required={optIdx < 2}
                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                          />
                        </div>
                      ))}
                    </div>

                    <input
                      type="text"
                      value={q.explanation || ''}
                      onChange={(e) => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                      placeholder="Explanation for the correct answer (optional)..."
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 mac-btn-glass cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl mac-btn-primary text-white font-semibold shadow-md cursor-pointer"
                >
                  {editingTest ? 'Update Assessment' : 'Save & Publish Test'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTests;

