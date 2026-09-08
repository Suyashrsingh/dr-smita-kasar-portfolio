const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// POST /api/messages (Public - Send message from Contact Section)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }
    const created = await store.createMessage({
      name,
      email,
      subject: subject || 'General Academic Inquiry',
      message
    });
    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been sent to Dr. Smita Kasar.',
      data: created
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/messages (Protected - Admin view)
router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await store.getMessages();
    return res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/messages/:id/read (Protected - Mark read/unread)
router.put('/:id/read', requireAuth, async (req, res) => {
  try {
    const { isRead } = req.body;
    const updated = await store.markMessageRead(req.params.id, isRead !== undefined ? isRead : true);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.json({ success: true, message: 'Message status updated', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/messages/:id (Protected - Delete message)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteMessage(req.params.id);
    return res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
