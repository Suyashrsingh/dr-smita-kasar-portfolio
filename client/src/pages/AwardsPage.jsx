import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Awards from '../components/Awards';
import { Award, Trophy, Star, ShieldCheck } from 'lucide-react';
import { awardService, profileService } from '../services/api';
import { initialAwards, initialProfile } from '../data/fallbackData';

const AwardsPage = () => {
  const [awards, setAwards] = useState(initialAwards);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      awardService.getAll(),
      profileService.getProfile()
    ]).then(([awdRes, profRes]) => {
      if (awdRes.status === 'fulfilled' && Array.isArray(awdRes.value.data?.data)) {
        setAwards(awdRes.value.data.data);
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
        badge="Accolades & Professional Distinctions"
        title="Honors, Awards & Recognitions"
        description="Spotlight on the prestigious Sir M. Visvesvaraya Outstanding Engineer Award 2023 along with national institutional teaching and innovation honors."
        icon={Trophy}
        breadcrumbs={[{ name: 'Awards & Honors' }]}
      />

      <main className="flex-1">
        {/* Full Awards Component */}
        <Awards awards={awards} />
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

export default AwardsPage;
