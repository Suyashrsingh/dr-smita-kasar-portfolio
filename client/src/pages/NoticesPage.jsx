import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import AnnouncementsSection from '../components/AnnouncementsSection';
import { Bell, FileText, Download, Calendar, User, Search } from 'lucide-react';
import { articleService, profileService } from '../services/api';

const NoticesPage = () => {
  const [articles, setArticles] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      articleService.getAll(),
      profileService.getProfile()
    ]).then(([artRes, profRes]) => {
      if (artRes.status === 'fulfilled') {
        setArticles(artRes.value.data?.data || []);
      }
      if (profRes.status === 'fulfilled') {
        setProfile(profRes.value.data?.data?.profile || null);
      }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Official Circulars & Course Notes"
        title="Academic Notices & Lecture Notes"
        description="Departmental circulars, official SPPU announcements, downloadable course study notes, and student research hackathon notices."
        icon={Bell}
        breadcrumbs={[{ name: 'Notices & Study Notes' }]}
      />

      <main className="flex-1">
        {/* Full Announcements / Articles Component */}
        <AnnouncementsSection articles={articles} />
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

export default NoticesPage;
