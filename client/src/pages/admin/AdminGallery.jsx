import React, { useState, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Calendar, 
  MapPin, 
  ExternalLink,
  Eye,
  EyeOff,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Camera,
  Loader2
} from 'lucide-react';
import { galleryService, uploadService } from '../../services/api';
import { initialGallery } from '../../data/fallbackData';

const AdminGallery = () => {
  const [gallery, setGallery] = useState(initialGallery);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const initialForm = {
    title: '',
    category: 'Conferences',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    location: 'Chhatrapati Sambhajinagar',
    featured: false,
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchGallery = async () => {
    try {
      const res = await galleryService.getAll();
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setGallery(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Conferences',
      imageUrl: item.imageUrl || '',
      date: item.date || new Date().toISOString().split('T')[0],
      description: item.description || '',
      location: item.location || '',
      featured: Boolean(item.featured),
      isPublished: item.isPublished !== false
    });
    setModalOpen(true);
  };

  // Handle direct file upload via /api/upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg(null);
    try {
      const res = await uploadService.uploadFile(file);
      if (res.data.success) {
        setFormData(prev => ({ ...prev, imageUrl: res.data.data.url }));
        setStatusMsg({ type: 'success', text: 'Photo uploaded successfully!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload photo: ' + (err.response?.data?.message || err.message) });
    } finally {
      setUploading(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await galleryService.togglePublish(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchGallery();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to update photo status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo from the gallery?')) return;
    try {
      const res = await galleryService.delete(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchGallery();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete gallery photo.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // imageUrl is optional; fallback to default if empty
      const payload = {
        ...formData,
        imageUrl: formData.imageUrl.trim() || '/smita-kasar.jpg'
      };

      if (editingItem) {
        const id = editingItem.id || editingItem._id;
        await galleryService.update(id, payload);
        setStatusMsg({ type: 'success', text: 'Photo details updated successfully!' });
      } else {
        await galleryService.create(payload);
        setStatusMsg({ type: 'success', text: 'New photo added to gallery!' });
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to save photo details.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Photo Moments Gallery Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Upload event photos directly from your device or specify an image URL with draft/publish toggling.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo to Gallery</span>
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

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => {
          const id = item.id || item._id;
          return (
            <div
              key={id}
              className="mac-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-video bg-slate-100 dark:bg-navy-900 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-black/65 text-white text-[11px] font-semibold backdrop-blur-sm">
                    {item.category}
                  </span>
                  
                  <button
                    onClick={() => handleTogglePublish(id)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md cursor-pointer transition-colors ${
                      item.isPublished !== false ? 'bg-emerald-600/90 text-white' : 'bg-amber-600/90 text-white'
                    }`}
                  >
                    {item.isPublished !== false ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>{item.date}</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(id)}
                  className="text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline cursor-pointer"
                >
                  {item.isPublished !== false ? 'Set Draft' : 'Publish'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
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

      {/* Modal with Upload & Optional URL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-lg w-full mac-card rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/10">
              <div className="mac-traffic-lights">
                <span className="mac-dot red" onClick={() => setModalOpen(false)} />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {editingItem ? 'Edit Photo Details' : 'Add New Photo to Gallery'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Photo Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. Keynote Address at National Technical Symposium (TECHNO)"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
                />
              </div>

              {/* DUAL UPLOAD / URL SECTION (BOTH OPTIONAL) */}
              <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                  Photo File Upload & Image URL (Optional)
                </span>

                {/* Direct File Upload Input */}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
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
                        <span>Uploading Photo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo from Computer (Click to Browse)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                  <span className="text-[10px] text-slate-400 uppercase font-mono">OR Enter URL</span>
                  <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                </div>

                {/* Image URL Input (Optional) */}
                <div className="space-y-1">
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="Paste image URL (e.g. /smita-kasar.jpg or https://...)"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Live Thumbnail Preview */}
                {formData.imageUrl && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-slate-500">Live Preview:</span>
                    <div className="h-28 rounded-xl overflow-hidden bg-black/5 dark:bg-black/20 border border-slate-200/60 dark:border-white/10 flex items-center justify-center relative">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { e.currentTarget.src = '/smita-kasar.jpg'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  >
                    <option value="Keynotes">Keynotes & Talks</option>
                    <option value="Conferences">Conferences</option>
                    <option value="Workshops">Workshops & FDPs</option>
                    <option value="Student Activities">Student Activities & SIH</option>
                    <option value="Awards">Awards & Honors</option>
                    <option value="Campus & Events">Campus & Events</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Date / Occasion</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. February 2025"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Location / Venue</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. MIT Auditorium, Chhatrapati Sambhajinagar"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Caption / Summary</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of keynote address or event moment..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="galPublish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-academic-600 rounded"
                />
                <label htmlFor="galPublish" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Publish photo to live gallery
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex justify-end gap-2">
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
                  {editingItem ? 'Save Photo Changes' : 'Add Photo'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGallery;
