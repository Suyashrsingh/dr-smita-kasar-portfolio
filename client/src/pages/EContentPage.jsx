import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import AnnouncementsSection from '../components/AnnouncementsSection';
import TestsSection from '../components/TestsSection';
import { 
  FileText, 
  FileCheck, 
  Download, 
  Sparkles, 
  Clock, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import { articleService, testService, profileService } from '../services/api';

const EContentPage = () => {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'tests'
  const [articles, setArticles] = useState([]);
  const [tests, setTests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      articleService.getAll(),
      testService.getAll(),
      profileService.getProfile()
    ]).then(([artRes, tstRes, profRes]) => {
      if (artRes.status === 'fulfilled') {
        setArticles(artRes.value.data?.data || []);
      }
      if (tstRes.status === 'fulfilled') {
        setTests(tstRes.value.data?.data || []);
      }
      if (profRes.status === 'fulfilled') {
        setProfile(profRes.value.data?.data?.profile || null);
      }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Digital Learning, Notes & Self-Assessment"
        title="E-Content & Academic Resources"
        description="Comprehensive repository of course lecture notes, syllabus blueprints, university circulars, and interactive self-assessment quizzes in Artificial Intelligence, Blockchain & Cyber Security."
        icon={FileText}
        breadcrumbs={[{ name: 'E-Content' }]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* macOS Glossy Tab Switcher */}
        <div className="mac-card p-3 max-w-lg mx-auto flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-academic-600 text-white shadow-md shadow-academic-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lecture Notes & Circulars</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-academic-600 text-white shadow-md shadow-academic-600/25'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Online Quizzes & Tests</span>
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'notes' ? (
          <div className="space-y-6">
            <AnnouncementsSection articles={articles} />
          </div>
        ) : (
          <div className="space-y-6">
            <TestsSection tests={tests} />
          </div>
        )}

      </main>

      <Footer profile={profile} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export default EContentPage;
