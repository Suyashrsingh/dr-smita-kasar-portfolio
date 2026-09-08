import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Projects from '../components/Projects';
import { Lightbulb, DollarSign, Building, Sparkles, ShieldCheck } from 'lucide-react';
import { projectService, profileService } from '../services/api';
import { initialProjects, initialProfile } from '../data/fallbackData';

const ProjectsPage = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      projectService.getAll(),
      profileService.getProfile()
    ]).then(([prjRes, profRes]) => {
      if (prjRes.status === 'fulfilled' && Array.isArray(prjRes.value.data?.data)) {
        setProjects(prjRes.value.data.data);
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
        badge="Funded Research Grants & Consultancies"
        title="Sponsored Research Projects"
        description="Major research grants received from AICTE, SPPU BCUD, and Industry Partners advancing AI in medical diagnosis, blockchain security, and smart city architectures."
        icon={Lightbulb}
        breadcrumbs={[{ name: 'Projects' }]}
      />

      <main className="flex-1">
        {/* Full Projects Explorer */}
        <Projects projects={projects} />
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

export default ProjectsPage;
