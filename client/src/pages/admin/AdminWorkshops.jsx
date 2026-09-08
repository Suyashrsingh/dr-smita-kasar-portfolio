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
  CheckCircle2,
  Search,
  Calendar,
  Building,
  Clock
} from 'lucide-react';
import { workshopService, uploadService } from '../../services/api';

const EVENT_TYPES = [
  'FDP',
  'Workshop',
  'STTP',
  'Keynote / Invited Talk',
  'Hackathon',
  'Seminar',
  'Conference',
  'Masterclass',
  'Webinar',
  'Training Program',
  'Other'
];

const EVENT_ROLES = [
  'Chief Convener & Organizer',
  'Organized / Convener',
  'Keynote Speaker',
  'Resource Person',
  'Session Chair',
  'Coordinator',
  'Expert Faculty',
  'Attended / Participant',
  'Other'
];

const AdminWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const initialForm = {
    title: '',
    role: 'Organized / Convener',
    type: 'FDP',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    duration: '1 Week',
    institution: 'Maharashtra Institute of Technology, Chhatrapati Sambhajinagar',
    description: '',
    posterUrl: '',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchWorkshops = async () => {
    try {
      const res = await workshopService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
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
      institution: wkp.institution || 'Maharashtra Institute of Technology, Chhatrapati Sambhajinagar',
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
        setStatusMsg({ type: 'success', text: `Event poster/material "${file.name}" uploaded successfully!` });
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
      const updatedList = await workshopService.getAll();
      if (updatedList.data?.success && Array.isArray(updatedList.data.data)) {
        setWorkshops(updatedList.data.data);
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to toggle publish status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workshop/event entry? This cannot be undone.')) return;
    setWorkshops(prev => prev.filter(w => (w.id || w._id) !== id));
    try {
      await workshopService.delete(id);
      setStatusMsg({ type: 'success', text: 'Workshop/event deleted successfully.' });
      const res = await workshopService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setWorkshops(res.data.data);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to delete workshop.';
      setStatusMsg({ type: 'error', text: `Failed to delete: ${errMsg}` });
      fetchWorkshops();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        title: formData.title.trim(),
        institution: formData.institution.trim(),
        posterUrl: formData.posterUrl.trim()
      };

      if (editingItem) {
        const id = editingItem.id || editingItem._id;
        await workshopService.update(id, payload);
        setStatusMsg({ type: 'success', text: 'Workshop/event updated successfully!' });
      } else {
        await workshopService.create(payload);
        setStatusMsg({ type: 'success', text: 'Workshop/event created and published successfully!' });
      }
      setModalOpen(false);
      const res = await workshopService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setWorkshops(res.data.data);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Error saving workshop.';
      setStatusMsg({ type: 'error', text: `Failed to save: ${errMsg}` });
    }
  };

  const filteredWorkshops = workshops.filter(w => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      w.title?.toLowerCase().includes(q) ||
      w.institution?.toLowerCase().includes(q) ||
      w.role?.toLowerCase().includes(q) ||
      w.type?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Manage Events, FDPs & Workshops
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create, edit, and organize Faculty Development Programs, national workshops, STTPs, and masterclasses.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer hover:opacity-95"
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

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workshops, FDPs, institutes..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
          />
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Showing {filteredWorkshops.length} of {workshops.length} events
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-academic-500 mb-3" />
          <p className="text-sm font-medium">Loading workshops & FDPs from database...</p>
        </div>
      ) : filteredWorkshops.length === 0 ? (
        <div className="mac-card rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-academic-500/10 text-academic-500 flex items-center justify-center">
            <Presentation className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {searchQuery ? 'No Matching Events Found' : 'No Workshops or FDPs Added Yet'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {searchQuery ? 'Try clearing your search query to see all events.' : 'Add your first faculty development program, keynote talk, or training workshop.'}
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md cursor-pointer hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event / Workshop</span>
          </button>
        </div>
      ) : (
        <div className="mac-card overflow-hidden shadow-sm rounded-2xl">
          <div className="overflow-x-auto">
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
                {filteredWorkshops.map((wkp) => {
                  const id = wkp.id || wkp._id;
                  return (
                    <tr key={id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="p-4 max-w-sm">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-2">
                          {wkp.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 text-[11px]">
                          <Building className="w-3 h-3 shrink-0" />
                          <span className="truncate">{wkp.institution}</span>
                        </div>
                        {wkp.posterUrl && (
                          <div className="mt-1">
                            <span className="inline-flex items-center gap-1 text-[10px] text-academic-600 dark:text-academic-400 font-mono">
                              <FileCheck className="w-3 h-3" /> Attached Material
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-academic-500/10 text-academic-700 dark:text-academic-300 font-bold border border-academic-500/20">
                          {wkp.type || 'Workshop'}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap text-slate-700 dark:text-slate-200 font-semibold">
                        {wkp.role || 'Convener'}
                      </td>
                      <td className="p-4 whitespace-nowrap font-mono text-slate-600 dark:text-slate-400">
                        <div>{wkp.date}</div>
                        <div className="text-[10px] text-slate-400">{wkp.duration || '1 Week'}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <button
                          onClick={() => handleTogglePublish(id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                            wkp.isPublished !== false
                              ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          }`}
                          title="Click to toggle publish visibility"
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
                      <td className="p-4 text-right whitespace-nowrap space-x-1">
                        <button 
                          onClick={() => openEditModal(wkp)} 
                          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-academic-50 dark:hover:bg-white/10 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1"
                          title="Edit Workshop/FDP"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-academic-600" />
                          <span className="text-[11px] font-semibold">Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(id)} 
                          className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-1"
                          title="Delete Workshop/FDP"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-semibold">Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create & Edit Workshop / FDP */}
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
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer">
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
                  placeholder="e.g. 1-Week National Level FDP on Generative AI & Deep Learning"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    {EVENT_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                    {!EVENT_TYPES.includes(formData.type) && (
                      <option value={formData.type}>{formData.type}</option>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Your Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    {EVENT_ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                    {!EVENT_ROLES.includes(formData.role) && (
                      <option value={formData.role}>{formData.role}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Date / Date Range *</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    placeholder="e.g. Jan 15-20, 2024 or 20 - 27 July 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 1 Week / 3 Days / Full Day"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Institution / Host Organization *</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  required
                  placeholder="e.g. Maharashtra Institute of Technology, Chhatrapati Sambhajinagar"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              {/* EVENT POSTER/PHOTO UPLOAD + OPTIONAL URL */}
              <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                  Event Poster / Certificate Upload & URL (Optional)
                </span>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
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
                        <span>Uploading Event Poster...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Poster / Certificate from Computer</span>
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
                      className="p-1 rounded-full text-slate-400 hover:text-rose-500 cursor-pointer"
                      title="Remove attachment"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Description / Highlights</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding attendees, topics, practical sessions, and sponsorship..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="wkpPublish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="wkpPublish" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Publish to public website immediately
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
                  className="px-5 py-2 rounded-xl mac-btn-primary text-white font-semibold shadow-md cursor-pointer hover:opacity-95"
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
