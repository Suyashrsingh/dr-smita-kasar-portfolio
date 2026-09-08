import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Trash2, CheckCircle2, Circle, Reply, Calendar, X } from 'lucide-react';
import { messageService } from '../../services/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await messageService.getAll();
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await messageService.markRead(id, !currentStatus);
      fetchMessages();
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await messageService.delete(id);
      setStatusMsg({ type: 'success', text: 'Message deleted successfully.' });
      fetchMessages();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete message.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Contact Messages & Inquiries
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View and respond to research queries, student inquiries, and keynote invitations.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-navy-900 text-xs font-semibold text-slate-700 dark:text-slate-300">
          Total: {messages.length} Messages ({messages.filter(m => !m.isRead).length} Unread)
        </span>
      </div>

      {statusMsg && (
        <div className={`p-3.5 rounded-xl text-xs flex items-center justify-between ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center text-slate-500 text-xs border border-slate-200 dark:border-slate-800">
            No contact inquiries found.
          </div>
        ) : (
          messages.map((msg) => {
            const id = msg.id || msg._id;
            return (
              <div
                key={id}
                className={`glass-card rounded-2xl p-6 border transition-all space-y-3 ${
                  !msg.isRead
                    ? 'border-academic-500/60 bg-academic-50/30 dark:bg-academic-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleReadStatus(id, msg.isRead)}
                      title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                      className="text-slate-400 hover:text-academic-600"
                    >
                      {msg.isRead ? (
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-academic-500 fill-academic-500" />
                      )}
                    </button>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {msg.name}
                      </span>
                      <span className="text-xs text-slate-500 font-mono ml-2">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="pl-6.5 space-y-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    Subject: {msg.subject}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-navy-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    {msg.message}
                  </p>
                </div>

                <div className="pl-6.5 pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/60">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-academic-600 hover:bg-academic-700 text-white transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <button
                    onClick={() => handleDelete(id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default AdminMessages;
