import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  X, 
  ExternalLink, 
  FileText, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  Link as LinkIcon,
  Loader2,
  FileCheck
} from 'lucide-react';
import { publicationService, uploadService } from '../../services/api';
import { initialPublications } from '../../data/fallbackData';

const AdminPublications = () => {
  const [publications, setPublications] = useState(initialPublications);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const initialForm = {
    title: '',
    authors: 'Dr. Smita Kasar',
    journal: '',
    year: new Date().getFullYear(),
    type: 'Journal',
    doi: '',
    pdfUrl: '',
    abstract: '',
    citations: 0,
    volume: '',
    issue: '',
    pages: '',
    featured: false,
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchPublications = async () => {
    try {
      const res = await publicationService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setPublications(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load publications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const openCreateModal = () => {
    setEditingPub(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (pub) => {
    setEditingPub(pub);
    setFormData({
      title: pub.title || '',
      authors: pub.authors || '',
      journal: pub.journal || '',
      year: pub.year || new Date().getFullYear(),
      type: pub.type || 'Journal',
      doi: pub.doi || '',
      pdfUrl: pub.pdfUrl || '',
      abstract: pub.abstract || '',
      citations: pub.citations || 0,
      volume: pub.volume || '',
      issue: pub.issue || '',
      pages: pub.pages || '',
      featured: Boolean(pub.featured),
      isPublished: pub.isPublished !== false
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
        setFormData(prev => ({ ...prev, pdfUrl: res.data.data.url }));
        setStatusMsg({ type: 'success', text: `Paper "${file.name}" uploaded successfully!` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload paper: ' + (err.response?.data?.message || err.message) });
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await publicationService.togglePublish(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchPublications();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to update publication status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;
    setPublications(prev => prev.filter(p => (p.id || p._id) !== id));
    try {
      await publicationService.delete(id);
      setStatusMsg({ type: 'success', text: 'Publication deleted successfully.' });
      fetchPublications();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete publication.' });
      fetchPublications();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        pdfUrl: formData.pdfUrl.trim()
      };

      if (editingPub) {
        const id = editingPub.id || editingPub._id;
        await publicationService.update(id, payload);
        setStatusMsg({ type: 'success', text: 'Publication updated successfully!' });
      } else {
        await publicationService.create(payload);
        setStatusMsg({ type: 'success', text: 'Publication created and published successfully!' });
      }
      setModalOpen(false);
      fetchPublications();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.response?.data?.message || 'Error saving publication.' });
    }
  };

  const filtered = publications.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.authors?.toLowerCase().includes(search.toLowerCase()) ||
    p.journal?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Manage Research Publications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Add, publish, unpublish, edit, or delete research papers, journal articles, and patents with direct PDF upload or links.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Publication</span>
        </button>
      </div>

      {statusMsg && (
        <div className={`p-3.5 rounded-xl text-xs flex items-center justify-between mac-card ${
          statusMsg.type === 'success' 
            ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300' 
            : 'border-rose-500/50 text-rose-700 dark:text-rose-300'
        }`}>
          <span>{statusMsg.text}</span>
          <button onClick={() => setStatusMsg(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter publications by title, authors, or journal..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm mac-input text-slate-900 dark:text-white"
        />
      </div>

      {/* Publications Table */}
      <div className="mac-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-4">Title & Details</th>
                <th className="p-4">Type</th>
                <th className="p-4">Year</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-white/10">
              {filtered.map((pub) => {
                const id = pub.id || pub._id;
                return (
                  <tr key={id} className="hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 max-w-md">
                      <div className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                        {pub.title}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1">
                        <strong>Authors:</strong> {pub.authors}
                      </div>
                      <div className="text-academic-600 dark:text-academic-400 italic">
                        {pub.journal}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {pub.type}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap font-mono font-semibold text-slate-900 dark:text-white">
                      {pub.year}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                          pub.isPublished !== false
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {pub.isPublished !== false ? (
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
                      <button
                        onClick={() => openEditModal(pub)}
                        className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto mac-card rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div className="mac-traffic-lights">
                <span className="mac-dot red" onClick={() => setModalOpen(false)} />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {editingPub ? 'Edit Publication Details' : 'Add New Research Publication'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Paper Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Deep Learning Framework for Diabetic Retinopathy..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Authors *</label>
                  <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                    required
                    placeholder="Dr. Smita Kasar, Co-Authors..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Journal / Conference Name *</label>
                  <input
                    type="text"
                    value={formData.journal}
                    onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    required
                    placeholder="e.g. IEEE Access / Elsevier / Springer..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Publication Year *</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Publication Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value="Journal">Journal</option>
                    <option value="Conference">Conference</option>
                    <option value="Book Chapter">Book Chapter</option>
                    <option value="Patent">Patent</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Citations Count</label>
                  <input
                    type="number"
                    value={formData.citations}
                    onChange={(e) => setFormData({ ...formData, citations: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* DUAL DIRECT FILE UPLOAD + OPTIONAL URL SECTION */}
              <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                  Paper PDF Upload & Document URL (Optional)
                </span>

                {/* Direct PDF File Upload Input */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
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
                        <span>Uploading PDF Document...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Full Paper PDF directly from Computer</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                  <span className="text-[10px] text-slate-400 uppercase font-mono">OR Enter URL</span>
                  <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                </div>

                {/* PDF URL / Cloud Link (Optional) */}
                <div className="space-y-1">
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                      placeholder="Paste PDF link (e.g. /uploads/... or https://ieeexplore.ieee.org/...)"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Current File Preview Badge */}
                {formData.pdfUrl && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-academic-500/10 border border-academic-500/20 text-[11px] text-academic-700 dark:text-academic-300">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck className="w-4 h-4 shrink-0 text-academic-600" />
                      <span className="font-mono truncate">{formData.pdfUrl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, pdfUrl: '' }))}
                      className="p-1 rounded-full text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">DOI String or Link</label>
                <input
                  type="text"
                  value={formData.doi}
                  onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                  placeholder="10.1109/ACCESS.2024.xxx"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Abstract Summary</label>
                <textarea
                  rows={3}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Enter abstract / summary of paper..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredPub"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-academic-600"
                  />
                  <label htmlFor="featuredPub" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Feature on Home Spotlight
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="publishPub"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600"
                  />
                  <label htmlFor="publishPub" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                    Publish Live on Website
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200/80 dark:border-white/10">
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
                  {editingPub ? 'Update Publication' : 'Save Publication'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPublications;

