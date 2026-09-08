import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Gallery from '../components/Gallery';
import { Image as ImageIcon, Camera, Sparkles } from 'lucide-react';
import { galleryService, profileService } from '../services/api';

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      galleryService.getAll(),
      profileService.getProfile()
    ]).then(([galRes, profRes]) => {
      if (galRes.status === 'fulfilled') {
        setGallery(galRes.value.data?.data || []);
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
        badge="Moments & Visual Archival"
        title="Photo Gallery & Event Moments"
        description="Highlights from international conferences, award ceremonies, department laboratories, university events, and student project exhibitions."
        icon={Camera}
        breadcrumbs={[{ name: 'Photo Gallery' }]}
      />

      <main className="flex-1">
        {/* Full Gallery Component */}
        <Gallery gallery={gallery} />
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

export default GalleryPage;
