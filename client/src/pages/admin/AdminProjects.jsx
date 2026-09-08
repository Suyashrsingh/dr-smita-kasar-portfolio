import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit2, Trash2, X, CheckCircle2, Clock, Eye, EyeOff } from 'lucide-react';
import { projectService } from '../../services/api';
import { initialProjects } from '../../data/fallbackData';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);

  const initialForm = {
    title: '',
    role: 'Principal Investigator (PI)',
    fundingAgency: '',
    amount: 'INR 5,00,000',
    duration: '2023 - 2025',
    status: 'Completed',
    domain: 'Computer Science & AI',
    description: '',
    isPublished: true
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    try {
      const res = await projectService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (prj) => {
    setEditingItem(prj);
    setFormData({
      title: prj.title || '',
      role: prj.role || 'Principal Investigator (PI)',
      fundingAgency: prj.fundingAgency || '',
      amount: prj.amount || '',
      duration: prj.duration || '',
      status: prj.status || 'Completed',
      domain: prj.domain || '',
      description: prj.description || '',
      isPublished: prj.isPublished !== false
    });
    setModalOpen(true);
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await projectService.togglePublish(id);
      setStatusMsg({ type: 'success', text: res.data.message });
      fetchProjects();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to update project status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    setProjects(prev => prev.filter(p => (p.id || p._id) !== id));
    try {
      await projectService.delete(id);
      setStatusMsg({ type: 'success', text: 'Project deleted successfully.' });
      const res = await projectService.getAll();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to delete project.' });
      fetchProjects();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        const id = editingItem.id || editingItem._id;
        await projectService.update(id, formData);
        setStatusMsg({ type: 'success', text: 'Project updated successfully!' });
      } else {
        await projectService.create(formData);
        setStatusMsg({ type: 'success', text: 'Project added and published successfully!' });
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Error saving project.' });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Funded Projects & Grants
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage research grants, industrial consultancy projects, and funding agency records.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-academic-600 hover:bg-academic-700 shadow-md shadow-academic-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
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

      {/* Grid or Empty/Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Clock className="w-8 h-8 text-academic-500 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="mac-card rounded-2xl p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All projects have been cleared or none have been added yet. Click "Add Project" above to create one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((prj) => {
            const id = prj.id || prj._id;
            return (
              <div key={id} className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                      {prj.role}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {prj.status}
                    </span>
                  </div>

                  <button
                    onClick={() => handleTogglePublish(id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold cursor-pointer transition-colors ${
                      prj.isPublished !== false
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    {prj.isPublished !== false ? (
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
                  {prj.title}
                </h3>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <strong>Agency:</strong> {prj.fundingAgency} • <span className="text-academic-600 font-mono">{prj.amount}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {prj.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(id)}
                  className="text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline"
                >
                  {prj.isPublished !== false ? 'Unpublish' : 'Publish'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(prj)}
                    className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-xs font-semibold flex items-center gap-1"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-lg w-full bg-white dark:bg-navy-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingItem ? 'Edit Research Project' : 'Add Research Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g. AI-Driven Non-Invasive Diagnostic Tool..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Funding Agency *</label>
                  <input
                    type="text"
                    value={formData.fundingAgency}
                    onChange={(e) => setFormData({ ...formData, fundingAgency: e.target.value })}
                    required
                    placeholder="e.g. AICTE RPS / SPPU BCUD"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Sanctioned Amount *</label>
                  <input
                    type="text"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    placeholder="e.g. INR 4,50,000"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Principal Investigator (PI)">Principal Investigator (PI)</option>
                    <option value="Co-Principal Investigator (Co-PI)">Co-Principal Investigator (Co-PI)</option>
                    <option value="Mentor / Lead">Mentor / Lead</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Sanctioned">Sanctioned</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 2022 - 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Domain</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="e.g. AI & Healthcare"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project objectives and outcomes..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="prjPublish"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="prjPublish" className="font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Publish project to live website
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-navy-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-white bg-academic-600 hover:bg-academic-700 font-semibold shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProjects;
