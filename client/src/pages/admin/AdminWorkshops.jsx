import React, { useState, useEffect, useRef } from 'react';
import { 
  Presentation, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Eye, 
  EyeOff,
  Upload,
  Link as LinkIcon,
  Loader2,
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { workshopService, uploadService } from '../../services/api';
import { initialWorkshops } from '../../data/fallbackData';

const AdminWorkshops = () => {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const initialForm = {
    title: '',
    role: 'Resource Person / Keynote',
    type: 'Keynote',
    date: '',
    duration: 'Full Day',
    institution: 'Maharashtra Institute of Technology, Chhatrapati Sambhajinagar',
    description: '',
    posterUrl: '',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchWorkshops = async () => {
    try {
      const res = await workshopService.getAll();
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setWorkshops(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load workshops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (wkp) => {
    setEditingItem(wkp);
    setFormData({
      title: wkp.title || '',
      role: wkp.role || 'Organized / Convener',
      type: wkp.type || 'FDP',
      date: wkp.date || '',
      duration: wkp.duration || '1 Week',
      institution: wkp.institution || '',
      description: wkp.description || '',
      posterUrl: wkp.posterUrl || '',
      isPublished: wkp.isPublished !== false
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg(null);
    try {
      const res = await uploadService.uploadFile(file);
      if (res.data.success) {
        setFormData(prev => ({ ...prev, posterUrl: res.data.data.url }));
        setStatusMsg({ type: 'success', text: `Event material "${file.name}" uploaded successfully!` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload file: ' + (err.response?.data?.message || err.message) });
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await workshopService.togglePublish(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchWorkshops();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to toggle publish status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workshop entry?')) return;
    try {
      await workshopService.delete(id);
      setStatusMsg({ type: 'success', text: 'Workshop deleted successfully.' });
      fetchWorkshops();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete workshop.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        posterUrl: formData.posterUrl.trim()
      };

      if (editingItem) {
        const id = editingItem.id || editingItem._id;
        await workshopService.update(id, payload);
        setStatusMsg({ type: 'success', text: 'Workshop updated successfully!' });
      } else {
        await workshopService.create(payload);
        setStatusMsg({ type: 'success', text: 'Workshop added and published successfully!' });
      }
      setModalOpen(false);
      fetchWorkshops();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error saving workshop.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Manage Events, FDPs & Workshops
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage Faculty Development Programs, STTPs, masterclasses, posters, and publish visibility.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event / Workshop</span>
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

      {/* Table List */}
      <div className="mac-card overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold uppercase">
              <th className="p-4">Event & Institution</th>
              <th className="p-4">Type</th>
              <th className="p-4">Role</th>
              <th className="p-4">Date & Duration</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 dark:divide-white/10">
            {workshops.map((wkp) => {
              const id = wkp.id || wkp._id;
              return (
                <tr key={id} className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                  <td className="p-4 max-w-sm">
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-2">
                      {wkp.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 mt-0.5">{wkp.institution}</div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold text-slate-700 dark:text-slate-300">
                      {wkp.type}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-academic-600 dark:text-academic-400 font-semibold">
                    {wkp.role}
                  </td>
                  <td className="p-4 whitespace-nowrap font-mono text-slate-600 dark:text-slate-400">
                    {wkp.date} ({wkp.duration})
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <button
                      onClick={() => handleTogglePublish(id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                        wkp.isPublished !== false
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {wkp.isPublished !== false ? (
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
                  </td>
                  <td className="p-4 text-right whitespace-nowrap space-x-2">
                    <button onClick={() => openEditModal(wkp)} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(id)} className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto mac-card rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div className="mac-traffic-lights">
                <span className="mac-dot red" onClick={() => setModalOpen(false)} />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {editingItem ? 'Edit Workshop / Event' : 'Add Workshop / FDP Event'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Workshop / FDP Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. 1-Week National Level FDP on Generative AI"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value="FDP">FDP</option>
                    <option value="Workshop">Workshop</option>
                    <option value="STTP">STTP</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Conference">Conference</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value="Organized / Convener">Organized / Convener</option>
                    <option value="Keynote Speaker">Keynote Speaker</option>
                    <option value="Resource Person">Resource Person</option>
                    <option value="Session Chair">Session Chair</option>
                    <option value="Attended">Attended</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Date String *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    placeholder="e.g. Jan 15-20, 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 1 Week / 3 Days"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Institution / Host *</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                  placeholder="e.g. Maharashtra Institute of Technology / Dr. BAMU / IIT Bombay"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              {/* DUAL EVENT POSTER/PHOTO UPLOAD + OPTIONAL URL */}
              <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                  Event Poster / Photo Upload & URL (Optional)
                </span>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-academic-400 dark:border-academic-600 hover:bg-academic-50/50 dark:hover:bg-white/5 text-academic-700 dark:text-academic-300 font-semibold cursor-pointer transition-colors"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading Event Poster/File...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Event Poster / Certificate from Computer</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                  <span className="text-[10px] text-slate-400 uppercase font-mono">OR Enter URL</span>
                  <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.posterUrl}
                      onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                      placeholder="Paste poster or certificate image link (e.g. /uploads/... or https://...)"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {formData.posterUrl && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-academic-500/10 border border-academic-500/20 text-[11px] text-academic-700 dark:text-academic-300">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-4 h-4 shrink-0 text-academic-600" />
                      <span className="font-mono truncate">{formData.posterUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, posterUrl: '' }))}
                      className="p-1 rounded-full text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding attendees, topics, and sessions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="wkpPublish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="wkpPublish" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Publish to live website
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200/80 dark:border-white/10">
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
                  {editingItem ? 'Save Changes' : 'Save Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminWorkshops;

