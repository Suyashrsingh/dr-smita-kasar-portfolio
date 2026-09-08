import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Publications from '../components/Publications';
import { BookOpen, ExternalLink, ShieldCheck, Download, Award } from 'lucide-react';
import { publicationService, profileService } from '../services/api';
import { initialPublications, initialProfile } from '../data/fallbackData';

const PublicationsPage = () => {
  const [publications, setPublications] = useState(initialPublications);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      publicationService.getAll(),
      profileService.getProfile()
    ]).then(([pubRes, profRes]) => {
      if (pubRes.status === 'fulfilled' && Array.isArray(pubRes.value.data?.data)) {
        setPublications(pubRes.value.data.data);
      }
      if (profRes.status === 'fulfilled' && profRes.value.data?.data?.profile) {
        setProfile(profRes.value.data.data.profile);
      }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Indexed Research & Scholarly Output"
        title="Publications & Patents"
        description="Comprehensive repository of 45+ peer-reviewed journal papers (SCI/Scopus), international conferences (IEEE/Springer), book chapters, and published patents."
        icon={BookOpen}
        breadcrumbs={[{ name: 'Publications' }]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Scholar Citation Metrics Strip */}
        <section className="mac-card p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-200/50 dark:divide-white/5">
            <div className="p-2">
              <p className="text-3xl font-black text-academic-600 dark:text-academic-400 font-display">45+</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Total Publications</p>
            </div>
            <div className="p-2">
              <p className="text-3xl font-black text-academic-600 dark:text-academic-400 font-display">350+</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Google Citations</p>
            </div>
            <div className="p-2">
              <p className="text-3xl font-black text-academic-600 dark:text-academic-400 font-display">11</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">h-index (Scholar)</p>
            </div>
            <div className="p-2">
              <p className="text-3xl font-black text-academic-600 dark:text-academic-400 font-display">4</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Patents Published</p>
            </div>
          </div>
        </section>

        {/* Full Publications Component */}
        <Publications publications={publications} />
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

export default PublicationsPage;
