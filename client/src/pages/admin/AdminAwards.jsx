import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Trophy, 
  Medal, 
  Star, 
  FileCheck, 
  Eye, 
  EyeOff,
  Upload,
  Link as LinkIcon,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { awardService, uploadService } from '../../services/api';
import { initialAwards } from '../../data/fallbackData';

const AdminAwards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const initialForm = {
    title: '',
    issuer: '',
    year: String(new Date().getFullYear()),
    category: 'National / State Recognition',
    description: '',
    icon: 'Trophy',
    certificateUrl: '',
    featured: false,
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchAwards = async () => {
    try {
      const res = await awardService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setAwards(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load awards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const openCreateModal = () => {
    setEditingAward(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (awd) => {
    setEditingAward(awd);
    setFormData({
      title: awd.title || '',
      issuer: awd.issuer || '',
      year: awd.year || String(new Date().getFullYear()),
      category: awd.category || 'National / State Recognition',
      description: awd.description || '',
      icon: awd.icon || 'Trophy',
      certificateUrl: awd.certificateUrl || '',
      featured: Boolean(awd.featured),
      isPublished: awd.isPublished !== false
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
        setFormData(prev => ({ ...prev, certificateUrl: res.data.data.url }));
        setStatusMsg({ type: 'success', text: `Certificate/Photo "${file.name}" uploaded successfully!` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload file: ' + (err.response?.data?.message || err.message) });
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await awardService.togglePublish(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchAwards();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to update publish status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this award?')) return;
    setAwards(prev => prev.filter(a => (a.id || a._id) !== id));
    try {
      await awardService.delete(id);
      setStatusMsg({ type: 'success', text: 'Award deleted.' });
      fetchAwards();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete award.' });
      fetchAwards();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        certificateUrl: formData.certificateUrl.trim()
      };

      if (editingAward) {
        const id = editingAward.id || editingAward._id;
        await awardService.update(id, payload);
        setStatusMsg({ type: 'success', text: 'Award updated successfully!' });
      } else {
        await awardService.create(payload);
        setStatusMsg({ type: 'success', text: 'Award added and published successfully!' });
      }
      setModalOpen(false);
      fetchAwards();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error saving award.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Manage Awards & Honors
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage state/national honors, citations, certificates, and toggle live publish visibility.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Award</span>
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

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awards.map((awd) => {
          const id = awd.id || awd._id;
          return (
            <div key={id} className="mac-card rounded-2xl p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 font-mono">
                      {awd.year}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{awd.category}</span>
                  </div>

                  <button
                    onClick={() => handleTogglePublish(id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                      awd.isPublished !== false
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {awd.isPublished !== false ? (
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

                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {awd.title}
                </h3>
                <p className="text-xs font-semibold text-academic-600 dark:text-academic-400">
                  {awd.issuer}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {awd.description}
                </p>

                {awd.certificateUrl && (
                  <div className="pt-1">
                    <a
                      href={awd.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold bg-white/60 dark:bg-white/10 text-academic-600 dark:text-academic-300 border border-academic-500/20"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>View Certificate / Proof</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(id)}
                  className="text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline cursor-pointer"
                >
                  {awd.isPublished !== false ? 'Set to Draft' : 'Publish to Live'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(awd)}
                    className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-xs font-semibold flex items-center gap-1 cursor-pointer"
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
                {editingAward ? 'Edit Award Details' : 'Add New Academic Award'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Award Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Sir M. Visvesvaraya Outstanding Engineer Award"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Conferring Organization *</label>
                  <input
                    type="text"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    required
                    placeholder="e.g. Institution of Engineers (India)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Year *</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g. Prestigious State Level Recognition"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              {/* DUAL CERTIFICATE UPLOAD + OPTIONAL URL */}
              <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                  Certificate Document / Photo Upload & URL (Optional)
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
                        <span>Uploading Certificate...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Certificate / Photo from Computer</span>
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
                      value={formData.certificateUrl}
                      onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                      placeholder="Paste certificate image or PDF URL (e.g. /uploads/... or https://...)"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {formData.certificateUrl && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-academic-500/10 border border-academic-500/20 text-[11px] text-academic-700 dark:text-academic-300">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-4 h-4 shrink-0 text-academic-600" />
                      <span className="font-mono truncate">{formData.certificateUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, certificateUrl: '' }))}
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
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Citation details and rationale..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="awdPublish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="awdPublish" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
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
                  {editingAward ? 'Save Changes' : 'Save Award'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminAwards;

