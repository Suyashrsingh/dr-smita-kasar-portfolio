import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import ResearchAreas from '../components/ResearchAreas';
import { 
  Cpu, 
  Brain, 
  ShieldCheck, 
  Network, 
  Activity, 
  Database, 
  Sparkles, 
  Layers, 
  Users, 
  ArrowRight,
  BookOpen,
  IndianRupee,
  CheckCircle2,
  Calendar,
  Building2,
  ExternalLink,
  Award
} from 'lucide-react';
import { profileService, projectService } from '../services/api';
import { Link } from 'react-router-dom';
import { initialProfile, initialResearchAreas, initialProjects } from '../data/fallbackData';

const ResearchPage = () => {
  const [data, setData] = useState({ profile: initialProfile, researchAreas: initialResearchAreas });
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      profileService.getProfile(),
      projectService.getAll()
    ])
      .then(([profRes, projRes]) => {
        if (profRes.status === 'fulfilled' && profRes.value.data?.data) {
          setData(prev => ({
            profile: profRes.value.data.data.profile || prev.profile,
            researchAreas: (profRes.value.data.data.researchAreas && profRes.value.data.data.researchAreas.length > 0)
              ? profRes.value.data.data.researchAreas
              : prev.researchAreas
          }));
        }
        if (projRes.status === 'fulfilled' && Array.isArray(projRes.value.data?.data)) {
          setProjects(projRes.value.data.data);
        }
      })
      .catch(err => console.error('Failed to load research data:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Cutting-Edge Domains & Doctoral Mentorship"
        title="Research Thrusts & Laboratories"
        description="Pioneering interdisciplinary research in Deep Learning for Healthcare, Blockchain Security, Cryptographic Systems, and Intelligent IoT."
        icon={Cpu}
        breadcrumbs={[{ name: 'Research Areas' }]}
      />

      <main className="flex-1">
        {/* Research Areas Component */}
        <ResearchAreas researchAreas={data.researchAreas} />

        {/* Funded Research Projects & Grants Section */}
        <section className="py-20 bg-slate-50/70 dark:bg-navy-950/60 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Sponsored Grants & Consultancies</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Funded Projects
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Track AICTE, SPPU BCUD, RGSTC, UGC, and industrial sponsored research grants and publishing status.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                    <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
                    <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((prj, idx) => {
                  const id = prj.id || prj._id;
                  return (
                    <div 
                      key={id || idx}
                      className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/50 dark:hover:border-academic-500/50 transition-all duration-300 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-lg group"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300 border border-academic-200 dark:border-academic-800">
                            {prj.role || 'Principal Investigator (PI)'}
                          </span>
                          
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              prj.status === 'Completed'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                            }`}>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{prj.status || 'Completed'}</span>
                            </span>

                            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {prj.duration}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white group-hover:text-academic-600 dark:group-hover:text-academic-400 transition-colors leading-snug">
                          {prj.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {prj.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1.5 font-medium truncate">
                            <Building2 className="w-3.5 h-3.5 text-academic-500 shrink-0" />
                            <span className="truncate">{prj.fundingAgency}</span>
                          </div>
                          
                          {prj.amount && (
                            <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 shrink-0 ml-2 font-mono">
                              <span>{prj.amount}</span>
                            </div>
                          )}
                        </div>

                        {prj.domain && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                            <span className="text-slate-400">Domain:</span>
                            <span className="text-slate-700 dark:text-slate-300">{prj.domain}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </section>

        {/* Doctoral Guidance & Laboratories Spotlight */}
        <section className="py-20 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider">
                Infrastructure & Guidance
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Research Labs & Mentorship Ecosystem
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Dr. Smita Kasar actively supervises Ph.D. scholars, Master's dissertations, and undergraduate innovation cohorts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-academic-50 dark:bg-academic-950 text-academic-600 dark:text-academic-400 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">AI & Healthcare Innovation Lab</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  High-performance computing workstations with NVIDIA GPU clusters dedicated to early disease detection, cancer biomarker imaging, and transformer models.
                </p>
                <div className="pt-2 text-xs font-semibold text-academic-600 dark:text-academic-400 flex items-center gap-1">
                  <span>8+ Active Research Papers</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Center of Excellence in Cyber Security</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Sandbox environments for blockchain smart contract audits, decentralized identity protocols, and post-quantum cryptographic primitives.
                </p>
                <div className="pt-2 text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <span>Industry & Govt Sponsored</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Ph.D. & PG Scholar Supervision</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  8+ Ph.D. scholars guided and registered under SPPU, with 30+ M.E. dissertations successfully defended in emerging computer engineering tracks.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>Recognized Ph.D. Research Guide</span>
                </div>
              </div>

            </div>

            {/* Quick Links CTA */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-academic-900 to-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-lg text-white">Interested in Research Collaboration or Ph.D. Guidance?</h4>
                <p className="text-xs text-slate-300">
                  Explore Dr. Smita Kasar's peer-reviewed publications or submit a research inquiry.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/publications"
                  className="px-4 py-2.5 rounded-xl bg-academic-600 hover:bg-academic-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Publications</span>
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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

export default ResearchPage;
