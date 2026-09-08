import React, { useState, useEffect, useRef } from 'react';
import { 
  UserCog, 
  Save, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  Plus, 
  Trash2, 
  Sparkles,
  FileText,
  Camera,
  Link as LinkIcon,
  Upload,
  Loader2,
  FileCheck
} from 'lucide-react';
import { profileService, uploadService } from '../../services/api';
import { 
  initialProfile, 
  initialEducation, 
  initialExperience, 
  initialResearchAreas 
} from '../../data/fallbackData';

const AdminProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [education, setEducation] = useState(initialEducation);
  const [experience, setExperience] = useState(initialExperience);
  const [researchAreas, setResearchAreas] = useState(initialResearchAreas);
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'contact', 'metrics', 'education', 'experience', 'research'
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await profileService.getProfile();
        if (res.data.success) {
          setProfile(res.data.data.profile || {});
          setEducation(res.data.data.education || []);
          setExperience(res.data.data.experience || []);
          setResearchAreas(res.data.data.researchAreas || []);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (section, field, value) => {
    if (section) {
      setProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatusMsg(null);
    try {
      const payload = {
        ...profile,
        education,
        experience,
        researchAreas
      };
      const res = await profileService.updateProfile(payload);
      if (res.data.success) {
        setStatusMsg({ type: 'success', text: 'All profile and academic details saved successfully!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setStatusMsg(null);
    try {
      const res = await uploadService.uploadFile(file);
      if (res.data.success) {
        handleChange(null, 'avatarUrl', res.data.data.url);
        setStatusMsg({ type: 'success', text: `Portrait photo "${file.name}" uploaded successfully! Remember to click "Save All Changes".` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload photo: ' + (err.response?.data?.message || err.message) });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingResume(true);
    setStatusMsg(null);
    try {
      const res = await uploadService.uploadFile(file);
      if (res.data.success) {
        handleChange(null, 'resumeUrl', res.data.data.url);
        setStatusMsg({ type: 'success', text: `Resume document "${file.name}" uploaded successfully! Remember to click "Save All Changes".` });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Failed to upload resume: ' + (err.response?.data?.message || err.message) });
    } finally {
      setUploadingResume(false);
    }
  };

  // Education CRUD helpers
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        id: `edu-${Date.now()}`,
        degree: 'New Degree / Program',
        institution: 'University / Institute Name',
        year: 'Year of Passing',
        specialization: 'Specialization Field',
        description: 'Details and achievements'
      }
    ]);
  };

  const handleUpdateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleDeleteEducation = (index) => {
    setEducation(education.filter((_, idx) => idx !== index));
  };

  // Experience CRUD helpers
  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        id: `exp-${Date.now()}`,
        role: 'Designation / Title',
        department: 'Department Name',
        institution: 'Institution / College',
        duration: 'Period (e.g., 2020 - Present)',
        type: 'Academic',
        description: 'Key leadership responsibilities and milestones'
      }
    ]);
  };

  const handleUpdateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const handleDeleteExperience = (index) => {
    setExperience(experience.filter((_, idx) => idx !== index));
  };

  // Research Areas CRUD helpers
  const handleAddResearchArea = () => {
    setResearchAreas([
      ...researchAreas,
      {
        id: `ra-${Date.now()}`,
        title: 'New Research Domain',
        description: 'Description of methodologies and technical focus',
        topics: ['Topic 1', 'Topic 2'],
        icon: 'Cpu'
      }
    ]);
  };

  const handleUpdateResearchArea = (index, field, value) => {
    const updated = [...researchAreas];
    if (field === 'topics') {
      updated[index][field] = typeof value === 'string' ? value.split(',').map(s => s.trim()) : value;
    } else {
      updated[index][field] = value;
    }
    setResearchAreas(updated);
  };

  const handleDeleteResearchArea = (index) => {
    setResearchAreas(researchAreas.filter((_, idx) => idx !== index));
  };

  if (loading || !profile) {
    return <div className="p-8 text-xs text-slate-500">Loading profile data...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      
      {/* Header & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Academic Profile & CMS Configuration
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full dynamic control over Dr. Smita Kasar's personal biography, degrees, career, metrics, and research domains.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-md transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Updates...' : 'Save All Changes'}</span>
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

      {/* macOS Glossy Tab Bar */}
      <div className="mac-card p-2 flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'general', label: 'Identity & Bio', icon: UserCog },
          { id: 'contact', label: 'Contact & Scholar IDs', icon: LinkIcon },
          { id: 'metrics', label: 'Citations & Stats', icon: Sparkles },
          { id: 'education', label: 'Degrees & Education', icon: GraduationCap },
          { id: 'experience', label: 'Career Trajectory', icon: Briefcase },
          { id: 'research', label: 'Research Domains', icon: Cpu }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-academic-600 text-white shadow-md shadow-academic-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General Identity & Bio */}
      {activeTab === 'general' && (
        <div className="mac-card p-6 space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-2">
            General Academic Identity & Affiliation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => handleChange(null, 'name', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Current Designation & Role</label>
              <input
                type="text"
                value={profile.title || ''}
                onChange={(e) => handleChange(null, 'title', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Short Headline Bio (Hero / Previews)</label>
            <textarea
              rows={2}
              value={profile.shortBio || ''}
              onChange={(e) => handleChange(null, 'shortBio', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Complete Biography (About Page)</label>
            <textarea
              rows={5}
              value={profile.fullBio || ''}
              onChange={(e) => handleChange(null, 'fullBio', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200/60 dark:border-white/10">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Institution</label>
              <input
                type="text"
                value={profile.affiliation?.institution || ''}
                onChange={(e) => handleChange('affiliation', 'institution', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Affiliating University</label>
              <input
                type="text"
                value={profile.affiliation?.university || ''}
                onChange={(e) => handleChange('affiliation', 'university', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-academic-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Direct Avatar Upload & Optional URL */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
              <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                Profile Portrait Photo (Upload / URL)
              </span>

              <div>
                <input
                  type="file"
                  ref={avatarInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-academic-400 dark:border-academic-600 hover:bg-academic-50/50 dark:hover:bg-white/5 text-academic-700 dark:text-academic-300 font-semibold cursor-pointer transition-colors"
                >
                  {uploadingAvatar ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading Photo...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload Photo from Computer</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                <span className="text-[10px] text-slate-400 uppercase font-mono">OR URL</span>
                <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
              </div>

              <div className="relative">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={profile.avatarUrl || ''}
                  onChange={(e) => handleChange(null, 'avatarUrl', e.target.value)}
                  placeholder="e.g. /smita-kasar.jpg or https://..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              {profile.avatarUrl && (
                <div className="flex items-center gap-3 p-2 rounded-xl bg-black/5 dark:bg-black/20 border border-slate-200/60 dark:border-white/10">
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar Preview"
                    className="w-10 h-10 rounded-lg object-cover"
                    onError={(e) => { e.currentTarget.src = '/smita-kasar.jpg'; }}
                  />
                  <div className="flex-1 truncate font-mono text-[10px] text-slate-500">
                    {profile.avatarUrl}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange(null, 'avatarUrl', '')}
                    className="p-1 rounded-full text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Direct Resume Upload & Optional URL */}
            <div className="p-4 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 space-y-3">
              <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider block">
                Curriculum Vitae / Resume (Upload / URL)
              </span>

              <div>
                <input
                  type="file"
                  ref={resumeInputRef}
                  onChange={handleResumeUpload}
                  accept=".doc,.docx,.pdf"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  disabled={uploadingResume}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-academic-400 dark:border-academic-600 hover:bg-academic-50/50 dark:hover:bg-white/5 text-academic-700 dark:text-academic-300 font-semibold cursor-pointer transition-colors"
                >
                  {uploadingResume ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading Resume...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload CV (.doc / .pdf) from Computer</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
                <span className="text-[10px] text-slate-400 uppercase font-mono">OR URL</span>
                <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
              </div>

              <div className="relative">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={profile.resumeUrl || ''}
                  onChange={(e) => handleChange(null, 'resumeUrl', e.target.value)}
                  placeholder="e.g. /SLK_resume.doc or https://..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-navy-950 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              {profile.resumeUrl && (
                <div className="flex items-center justify-between p-2 rounded-xl bg-academic-500/10 border border-academic-500/20 text-[11px] text-academic-700 dark:text-academic-300">
                  <div className="flex items-center gap-2 truncate">
                    <FileCheck className="w-4 h-4 shrink-0 text-academic-600" />
                    <span className="font-mono truncate">{profile.resumeUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange(null, 'resumeUrl', '')}
                    className="p-1 rounded-full text-slate-400 hover:text-rose-500"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Contact Details & Scholar Identifiers */}
      {activeTab === 'contact' && (
        <div className="mac-card p-6 space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-2">
            Contact Information & Verified Scholar IDs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Official Institutional Email</label>
              <input
                type="email"
                value={profile.contact?.email || ''}
                onChange={(e) => handleChange('contact', 'email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Alternate Email</label>
              <input
                type="email"
                value={profile.contact?.alternateEmail || ''}
                onChange={(e) => handleChange('contact', 'alternateEmail', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Mobile Phone</label>
              <input
                type="text"
                value={profile.contact?.phone || ''}
                onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Department Landline</label>
              <input
                type="text"
                value={profile.contact?.landline || ''}
                onChange={(e) => handleChange('contact', 'landline', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Department Chamber Address</label>
            <input
              type="text"
              value={profile.contact?.office || ''}
              onChange={(e) => handleChange('contact', 'office', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">Residential Address</label>
            <input
              type="text"
              value={profile.contact?.residence || ''}
              onChange={(e) => handleChange('contact', 'residence', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
            />
          </div>

          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 pt-3 border-t border-slate-200/60 dark:border-white/10">
            Verified Scholarly Networks & URLs
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Scopus Author Profile URL</label>
              <input
                type="text"
                value={profile.socialLinks?.scopus || ''}
                onChange={(e) => handleChange('socialLinks', 'scopus', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">ORCID ID URL</label>
              <input
                type="text"
                value={profile.socialLinks?.orcid || ''}
                onChange={(e) => handleChange('socialLinks', 'orcid', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Google Scholar Profile URL</label>
              <input
                type="text"
                value={profile.socialLinks?.googleScholar || ''}
                onChange={(e) => handleChange('socialLinks', 'googleScholar', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">ResearchGate URL</label>
              <input
                type="text"
                value={profile.socialLinks?.researchGate || ''}
                onChange={(e) => handleChange('socialLinks', 'researchGate', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">LinkedIn Profile URL</label>
              <input
                type="text"
                value={profile.socialLinks?.linkedin || ''}
                onChange={(e) => handleChange('socialLinks', 'linkedin', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-mono text-[11px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Citations & Academic Stats */}
      {activeTab === 'metrics' && (
        <div className="mac-card p-6 space-y-5 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-2">
            Academic Performance & Citation Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Years of Experience</label>
              <input
                type="number"
                value={profile.stats?.experienceYears ?? 24}
                onChange={(e) => handleChange('stats', 'experienceYears', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Total Publications</label>
              <input
                type="number"
                value={profile.stats?.publicationsCount ?? 45}
                onChange={(e) => handleChange('stats', 'publicationsCount', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Google Scholar Citations</label>
              <input
                type="number"
                value={profile.stats?.citationsCount ?? 350}
                onChange={(e) => handleChange('stats', 'citationsCount', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">h-index</label>
              <input
                type="number"
                value={profile.stats?.hIndex ?? 11}
                onChange={(e) => handleChange('stats', 'hIndex', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">i10-index</label>
              <input
                type="number"
                value={profile.stats?.i10Index ?? 14}
                onChange={(e) => handleChange('stats', 'i10Index', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Patents Published / Granted</label>
              <input
                type="number"
                value={profile.stats?.patentsCount ?? 4}
                onChange={(e) => handleChange('stats', 'patentsCount', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Ph.D. Scholars Guided</label>
              <input
                type="number"
                value={profile.stats?.phdScholarsGuided ?? 8}
                onChange={(e) => handleChange('stats', 'phdScholarsGuided', Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Education Qualifications */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Academic Degrees & Qualifications
            </h3>
            <button
              type="button"
              onClick={handleAddEducation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold mac-btn-primary text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="mac-card p-5 space-y-3 text-xs relative">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-academic-600 dark:text-academic-400 font-mono">
                    Degree #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Degree Title</label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Institution & Board</label>
                    <input
                      type="text"
                      value={edu.institution || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Year & Grade</label>
                    <input
                      type="text"
                      value={edu.year || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'year', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Specialization / Thesis Title</label>
                  <input
                    type="text"
                    value={edu.specialization || ''}
                    onChange={(e) => handleUpdateEducation(idx, 'specialization', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Career Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Career Trajectory & Appointments
            </h3>
            <button
              type="button"
              onClick={handleAddExperience}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold mac-btn-primary text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Position</span>
            </button>
          </div>

          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx} className="mac-card p-5 space-y-3 text-xs relative">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">
                    Position #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Role / Designation</label>
                    <input
                      type="text"
                      value={exp.role || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'role', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Institution & Location</label>
                    <input
                      type="text"
                      value={exp.institution || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'institution', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Tenure Duration</label>
                    <input
                      type="text"
                      value={exp.duration || ''}
                      onChange={(e) => handleUpdateExperience(idx, 'duration', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Description of Responsibilities</label>
                  <input
                    type="text"
                    value={exp.description || ''}
                    onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Research Focus Thrusts */}
      {activeTab === 'research' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Research Domains & Specializations
            </h3>
            <button
              type="button"
              onClick={handleAddResearchArea}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold mac-btn-primary text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Research Thrust</span>
            </button>
          </div>

          <div className="space-y-4">
            {researchAreas.map((ra, idx) => (
              <div key={ra.id || idx} className="mac-card p-5 space-y-3 text-xs relative">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                    Research Area #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteResearchArea(idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Domain Title</label>
                    <input
                      type="text"
                      value={ra.title || ''}
                      onChange={(e) => handleUpdateResearchArea(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Sub-topics (comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(ra.topics) ? ra.topics.join(', ') : (ra.topics || '')}
                      onChange={(e) => handleUpdateResearchArea(idx, 'topics', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Research Abstract / Summary</label>
                  <textarea
                    rows={2}
                    value={ra.description || ''}
                    onChange={(e) => handleUpdateResearchArea(idx, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProfile;
