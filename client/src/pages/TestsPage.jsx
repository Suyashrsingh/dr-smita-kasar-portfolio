import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import TestsSection from '../components/TestsSection';
import { FileCheck, Award, Clock, HelpCircle, Sparkles } from 'lucide-react';
import { testService, profileService } from '../services/api';

const TestsPage = () => {
  const [tests, setTests] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      testService.getAll(),
      profileService.getProfile()
    ]).then(([tstRes, profRes]) => {
      if (tstRes.status === 'fulfilled') {
        setTests(tstRes.value.data?.data || []);
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
        badge="Interactive Learning & Self-Assessment"
        title="Online Tests & Quizzes"
        description="Test your engineering knowledge in Artificial Intelligence, Blockchain, and Cyber Security with real-time timed assessments and detailed answer reviews."
        icon={FileCheck}
        breadcrumbs={[{ name: 'Online Tests' }]}
      />

      <main className="flex-1">
        {/* Full Tests Section */}
        <TestsSection tests={tests} />
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

export default TestsPage;
