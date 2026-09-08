import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ResumeModal from '../components/ResumeModal';
import Footer from '../components/Footer';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  BookOpen, 
  Lightbulb, 
  Award, 
  Presentation, 
  Bell, 
  FileCheck, 
  Camera, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Download,
  ShieldCheck,
  Building2,
  Clock,
  ChevronRight
} from 'lucide-react';

import { 
  profileService, 
  publicationService, 
  awardService, 
  workshopService, 
  projectService, 
  galleryService,
  testService,
  articleService
} from '../services/api';
import {
  initialProfile,
  initialEducation,
  initialExperience,
  initialResearchAreas,
  initialPublications,
  initialAwards,
  initialWorkshops,
  initialProjects,
  initialGallery,
  initialTests,
  initialArticles
} from '../data/fallbackData';

const HomePage = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [data, setData] = useState({
    profile: initialProfile,
    education: initialEducation,
    experience: initialExperience,
    researchAreas: initialResearchAreas,
    publications: initialPublications,
    awards: initialAwards,
    workshops: initialWorkshops,
    projects: initialProjects,
    articles: initialArticles,
    tests: initialTests,
    gallery: initialGallery
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [profRes, pubRes, awdRes, wkpRes, prjRes, galRes, tstRes, artRes] = await Promise.allSettled([
          profileService.getProfile(),
          publicationService.getAll(),
          awardService.getAll(),
          workshopService.getAll(),
          projectService.getAll(),
          galleryService.getAll(),
          testService.getAll(),
          articleService.getAll()
        ]);

        const profData = profRes.status === 'fulfilled' && profRes.value.data?.data ? profRes.value.data.data : null;

        setData(prev => ({
          profile: profData?.profile || prev.profile,
          education: (profData?.education && profData.education.length > 0) ? profData.education : prev.education,
          experience: (profData?.experience && profData.experience.length > 0) ? profData.experience : prev.experience,
          researchAreas: (profData?.researchAreas && profData.researchAreas.length > 0) ? profData.researchAreas : prev.researchAreas,
          publications: (pubRes.status === 'fulfilled' && Array.isArray(pubRes.value.data?.data) && pubRes.value.data.data.length > 0) ? pubRes.value.data.data : prev.publications,
          awards: (awdRes.status === 'fulfilled' && Array.isArray(awdRes.value.data?.data) && awdRes.value.data.data.length > 0) ? awdRes.value.data.data : prev.awards,
          workshops: (wkpRes.status === 'fulfilled' && Array.isArray(wkpRes.value.data?.data) && wkpRes.value.data.data.length > 0) ? wkpRes.value.data.data : prev.workshops,
          projects: (prjRes.status === 'fulfilled' && Array.isArray(prjRes.value.data?.data) && prjRes.value.data.data.length > 0) ? prjRes.value.data.data : prev.projects,
          gallery: (galRes.status === 'fulfilled' && Array.isArray(galRes.value.data?.data) && galRes.value.data.data.length > 0) ? galRes.value.data.data : prev.gallery,
          tests: (tstRes.status === 'fulfilled' && Array.isArray(tstRes.value.data?.data) && tstRes.value.data.data.length > 0) ? tstRes.value.data.data : prev.tests,
          articles: (artRes.status === 'fulfilled' && Array.isArray(artRes.value.data?.data) && artRes.value.data.data.length > 0) ? artRes.value.data.data : prev.articles
        }));
      } catch (err) {
        console.error('Failed to load portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      
      <main className="flex-1 space-y-20 pb-20">
        
        {/* 1. Hero Section */}
        <Hero profile={data.profile} onOpenResume={() => setIsResumeOpen(true)} />

        {/* Quick Portal Navigation Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'About Me', path: '/about', icon: User, color: 'text-academic-500' },
              { label: 'Publications', path: '/publications', icon: BookOpen, color: 'text-blue-500' },
              { label: 'Awards & Honors', path: '/awards', icon: Award, color: 'text-amber-500' },
              { label: 'Research Thrusts', path: '/research', icon: Cpu, color: 'text-purple-500' },
              { label: 'Events & Talks', path: '/events', icon: Presentation, color: 'text-rose-500' },
              { label: 'E-Content & Quizzes', path: '/e-content', icon: FileCheck, color: 'text-emerald-500' },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="mac-card p-4 hover:border-academic-500/60 transition-all flex flex-col items-center text-center gap-2 group cursor-pointer"
              >
                <div className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-academic-600 dark:group-hover:text-academic-400">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. About Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800/80 shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="w-48 h-48 rounded-3xl overflow-hidden bg-gradient-to-tr from-academic-600 to-navy-900 shadow-xl border-4 border-white dark:border-navy-900">
                  <img
                    src="/smita-kasar.jpg"
                    alt="Dr. Smita Lalit Kasar"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dr. Smita Lalit Kasar</h3>
                  <p className="text-xs font-semibold text-academic-600 dark:text-academic-400">
                    Professor & Head of Department, CSE
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar</p>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
                    <User className="w-3.5 h-3.5" />
                    <span>Academic Authority & Biography</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    24+ Years Dedicated to Computer Science Education & Innovation
                  </h2>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {data.profile?.shortBio || "Dedicated academician, researcher, and mentor with over 20+ years of distinguished experience in Computer Science and Engineering, specializing in AI, Machine Learning, Blockchain, and Cyber Security."}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-academic-600 hover:bg-academic-700 text-white font-semibold text-xs shadow-md shadow-academic-600/20 transition-all cursor-pointer"
                  >
                    <span>Read Full Profile & Biography</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Qualifications & Career Experience Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Qualifications & Timeline</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Academic Degrees & Career Trajectory
              </h2>
            </div>

            <Link
              to="/qualifications"
              className="inline-flex items-center gap-2 text-xs font-bold text-academic-600 dark:text-academic-400 hover:text-academic-700 dark:hover:text-academic-300 group"
            >
              <span>View Full Qualifications & Experience</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education Highlight Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-academic-50 dark:bg-academic-950 text-academic-600 dark:text-academic-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Education Highlights</h3>
                </div>
                <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 bg-academic-50 dark:bg-academic-950 px-2.5 py-1 rounded-full">
                  Ph.D., M.E., B.E.
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Doctor of Philosophy in Computer Engineering from Savitribai Phule Pune University (SPPU), Master of Engineering with First Class Distinction, and Bachelor of Engineering with Honors.
              </p>
              <div className="pt-2">
                <Link
                  to="/qualifications"
                  className="text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Academic Timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Experience Highlight Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Leadership & Experience</h3>
                </div>
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950 px-2.5 py-1 rounded-full">
                  24+ Years
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Professor & Head of Department in CSE at Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar. Autonomous curriculum governance, Dr. BAMU Ph.D. guidance, and CoE laboratories.
              </p>
              <div className="pt-2">
                <Link
                  to="/qualifications"
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>View Leadership Milestones</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Research Thrusts Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>Specialized Domains</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Core Research Focus Areas
              </h2>
            </div>

            <Link
              to="/research"
              className="inline-flex items-center gap-2 text-xs font-bold text-academic-600 dark:text-academic-400 hover:text-academic-700 dark:hover:text-academic-300 group"
            >
              <span>Explore Research Labs & Ph.D. Guidance</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.researchAreas.slice(0, 3) || []).map((area, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-academic-50 dark:bg-academic-950 text-academic-600 dark:text-academic-400 flex items-center justify-center font-bold text-base">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{area.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {area.description}
                </p>
                <div className="pt-2">
                  <Link
                    to="/research"
                    className="text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Featured Publications Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Scholarly Output</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Featured Publications & Patents
              </h2>
            </div>

            <Link
              to="/publications"
              className="inline-flex items-center gap-2 text-xs font-bold text-academic-600 dark:text-academic-400 hover:text-academic-700 dark:hover:text-academic-300 group"
            >
              <span>Browse All 45+ Publications</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {(data.publications.slice(0, 3) || []).map((pub, idx) => (
              <div
                key={pub.id || pub._id || idx}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                      {pub.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">{pub.year}</span>
                    {pub.citationsCount > 0 && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                        {pub.citationsCount} Citations
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-academic-600 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                    {pub.authors} • <span className="italic">{pub.journal}</span>
                  </p>
                </div>

                <Link
                  to="/publications"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-navy-900 hover:bg-academic-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-800 transition-all shrink-0"
                >
                  View Citation
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/publications"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-academic-600 hover:bg-academic-700 text-white font-bold text-xs shadow-md shadow-academic-600/20 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Complete 45+ Publication Library</span>
            </Link>
          </div>
        </section>

        {/* 6. Awards & Distinctions Spotlight */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-navy-950 via-academic-950 to-slate-950 text-white border border-accent-gold-500/30 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold-500/20 text-accent-gold-400 text-xs font-bold uppercase tracking-wider border border-accent-gold-500/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>State & National Honor</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  Sir M. Visvesvaraya Outstanding Engineer Award 2023
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Conferred for distinguished contributions to Computer Science Engineering pedagogy, research publications, patent innovations, and institutional leadership.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/awards"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent-gold-500 hover:bg-accent-gold-600 text-slate-950 font-bold text-xs shadow-lg shadow-accent-gold-500/20 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View All Honors & Awards</span>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* 7. E-Content & Online Assessments Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* E-Content & Notes Card */}
            <div className="mac-card p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-academic-50 dark:bg-white/5 text-academic-600 dark:text-academic-400 flex items-center justify-center">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider">
                    Study Resources & Bulletins
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Academic Notices & Lecture Notes
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Access official departmental circulars, downloadable course lecture notes, and syllabus blueprints curated for university scholars.
                </p>
              </div>

              <Link
                to="/e-content"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-academic-600 hover:bg-academic-700 text-white font-bold text-xs shadow-md shadow-academic-600/20 transition-all"
              >
                <span>Access Lecture Notes & Circulars</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Online Tests Card */}
            <div className="mac-card p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Student Assessments
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    Online Tests & Quizzes
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Attempt interactive timed quizzes in AI, Machine Learning, and Blockchain with automated scoring and instant question review.
                </p>
              </div>

              <Link
                to="/e-content"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>Launch Online Assessments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* 8. Events, Keynotes & Photo Highlights Spotlight */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Workshops & Keynotes */}
            <div className="mac-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Presentation className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">Workshops, FDPs & Keynotes</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  National faculty development programs, expert keynote addresses at MAC & Laghu Udyog Bharati, and technical STTPs.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Explore Events & Keynotes</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Photo Gallery */}
            <div className="mac-card p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-white/5 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">Photo Moments & Archives</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Visual highlights from international conferences, award ceremonies, and department moments.
                </p>
              </div>
              <Link
                to="/events"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                <span>Browse Photo Gallery</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

        {/* 9. Contact CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-academic-600 to-academic-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Interested in Collaboration or Mentorship?
              </h2>
              <p className="text-xs sm:text-sm text-academic-100 max-w-xl">
                Feel free to get in touch for academic consultations, research joint ventures, keynote addresses, and doctoral inquiries.
              </p>
            </div>

            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-academic-900 font-bold text-xs shadow-lg transition-all shrink-0 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-academic-600" />
              <span>Get In Touch with Dr. Kasar</span>
            </Link>
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

export default HomePage;
