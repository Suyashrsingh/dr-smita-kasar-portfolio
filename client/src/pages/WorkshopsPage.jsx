import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Workshops from '../components/Workshops';
import { Presentation, Users, Calendar, Sparkles } from 'lucide-react';
import { workshopService, profileService } from '../services/api';
import { initialWorkshops, initialProfile } from '../data/fallbackData';

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      workshopService.getAll(),
      profileService.getProfile()
    ]).then(([wkpRes, profRes]) => {
      if (wkpRes.status === 'fulfilled' && Array.isArray(wkpRes.value.data?.data) && wkpRes.value.data.data.length > 0) {
        setWorkshops(wkpRes.value.data.data);
      }
      if (profRes.status === 'fulfilled' && profRes.value.data?.data?.profile) {
        setProfile(profRes.value.data.data.profile);
      }
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Academic Outreach & Faculty Development"
        title="Workshops, FDPs & STTPs"
        description="National and AICTE-sponsored Faculty Development Programs, expert keynotes, Short Term Training Programs, and hands-on masterclasses."
        icon={Presentation}
        breadcrumbs={[{ name: 'Workshops & FDPs' }]}
      />

      <main className="flex-1">
        {/* Full Workshops Component */}
        <Workshops workshops={workshops} />
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

export default WorkshopsPage;
