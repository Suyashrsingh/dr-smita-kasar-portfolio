import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Education from '../components/Education';
import Experience from '../components/Experience';
import { GraduationCap, Briefcase, Award, Download, CheckCircle2 } from 'lucide-react';
import { profileService } from '../services/api';
import { initialProfile, initialEducation, initialExperience } from '../data/fallbackData';

const QualificationsPage = () => {
  const [data, setData] = useState({ 
    profile: initialProfile, 
    education: initialEducation, 
    experience: initialExperience 
  });
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    profileService.getProfile()
      .then(res => {
        if (res.data?.data) {
          setData(prev => ({
            profile: res.data.data.profile || prev.profile,
            education: Array.isArray(res.data.data.education) ? res.data.data.education : prev.education,
            experience: Array.isArray(res.data.data.experience) ? res.data.data.experience : prev.experience
          }));
        }
      })
      .catch(err => console.error('Failed to load qualifications:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Academic Credentials & Career Milestones"
        title="Qualifications & Experience"
        description="Doctor of Philosophy from SPPU Pune, Master of Engineering with Distinction, and over 20+ years of progressive leadership as Professor and Head of Department."
        icon={GraduationCap}
        breadcrumbs={[{ name: 'Qualifications & Experience' }]}
      />

      <main className="flex-1">
        {/* Education Section */}
        <Education education={data.education} />

        {/* Experience Section */}
        <Experience experience={data.experience} />

        {/* Resume Banner CTA */}
        <section className="py-12 bg-white dark:bg-navy-900 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Need a Detailed Academic & Administrative Curriculum Vitae?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Download the complete formal dossier of Dr. Smita Kasar detailing university committees, accreditation reports, thesis reviews, and course syllabi.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-academic-600 hover:bg-academic-700 text-white font-semibold text-sm shadow-lg shadow-academic-600/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Open Formal Curriculum Vitae</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer profile={data.profile} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={data.profile}
      />
    </div>
  );
};

export default QualificationsPage;
