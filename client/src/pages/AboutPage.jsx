import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import { 
  User, 
  Award, 
  BookOpen, 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  FileText,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Target,
  Users,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { profileService } from '../services/api';

const AboutPage = () => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    profileService.getProfile()
      .then(res => {
        if (res.data?.data) {
          setProfile(res.data.data.profile);
          setEducation(res.data.data.education || []);
          setExperience(res.data.data.experience || []);
        }
      })
      .catch(err => console.error('Failed to load profile:', err))
      .finally(() => setLoading(false));
  }, []);

  const verifiedProfiles = [
    { name: 'Google Scholar', href: profile?.socialLinks?.googleScholar || 'https://scholar.google.co.in/citations?user=drsmitakasar', desc: '350+ Citations • h-index: 11 • i10-index: 14' },
    { name: 'Scopus Author ID', href: profile?.socialLinks?.scopus || 'https://www.scopus.com/authid/detail.url?authorId=55370475800', desc: 'Author ID: 55370475800' },
    { name: 'ORCID Identifier', href: profile?.socialLinks?.orcid || 'https://orcid.org/0000-0002-6441-9658', desc: '0000-0002-6441-9658' },
    { name: 'ResearchGate', href: profile?.socialLinks?.researchGate || 'https://www.researchgate.net/profile/Smita-Kasar', desc: 'Verified Researcher Profile' },
    { name: 'LinkedIn Profile', href: profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/dr-smita-kasar', desc: 'Professional Academic Network' },
  ];

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Complete Academic & Leadership Profile"
        title="About Dr. Smita Lalit Kasar"
        description="Professor & Head of Department in Computer Science and Engineering at Maharashtra Institute of Technology (MIT), Sir M. Visvesvaraya Outstanding Engineer Awardee 2023, with over 24+ years of academic excellence, doctoral guidance, and research innovation."
        icon={User}
        breadcrumbs={[{ name: 'About Me' }]}
      />

      <main className="flex-1 py-12 space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section 1: Portrait & Executive Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Portrait Card & Verified IDs */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Glossy Profile Card */}
              <div className="mac-card rounded-3xl p-6 relative overflow-hidden">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-academic-600 via-navy-900 to-slate-900 overflow-hidden relative shadow-lg">
                  <img
                    src="/smita-kasar.jpg"
                    alt="Dr. Smita Lalit Kasar"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.querySelector('.fallback-placeholder').style.display = 'flex';
                    }}
                  />
                  <div className="fallback-placeholder hidden w-full h-full flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-tr from-navy-950 to-academic-700">
                    <GraduationCap className="w-16 h-16 mb-3 text-academic-300 animate-pulse" />
                    <h3 className="font-display font-bold text-xl">Dr. Smita Lalit Kasar</h3>
                    <p className="text-academic-200 text-xs mt-1">Ph.D. in Computer Science & Engineering</p>
                  </div>

                  {/* Award Spotlight Badge Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 mac-dock rounded-xl p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider leading-none">
                        Awardee 2023
                      </p>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                        Sir M. Visvesvaraya Outstanding Engineer Award
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold text-xs mac-btn-primary cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>View / Download CV</span>
                  </button>
                  <a
                    href="mailto:smitakasar@gmail.com"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 font-semibold text-xs mac-btn-glass"
                  >
                    <Mail className="w-4 h-4 text-academic-500" />
                    <span>Email Office</span>
                  </a>
                </div>
              </div>

              {/* Verified Scholar Identifiers */}
              <div className="mac-card rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-academic-500" />
                  <span>Verified Research Identifiers</span>
                </h4>
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {verifiedProfiles.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 flex items-center justify-between group hover:text-academic-600 dark:hover:text-academic-400 transition-colors"
                    >
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 group-hover:text-academic-600 dark:group-hover:text-academic-400">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.desc}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-academic-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Full Narrative & Academic Pillars */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Biographical Narrative */}
              <div className="mac-card rounded-3xl p-8 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider">
                    Scholarly Profile & Vision
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    24+ Years Dedicated to Engineering Pedagogy & Research
                  </h3>
                </div>

                <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    <strong>Dr. Smita Lalit Kasar</strong> is currently serving as <strong>Professor & Head of Department</strong> in Computer Science and Engineering at Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. With over two decades of distinguished academic, research, and administrative service, she has been instrumental in modernizing computer engineering curricula, building world-class laboratory ecosystems, and mentoring hundreds of undergraduate, postgraduate, and doctoral students.
                  </p>
                  <p>
                    She was awarded her <strong>Doctor of Philosophy (Ph.D.)</strong> in Computer Science & Engineering by Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU) under the supervision of <strong>Dr. M. S. Joshi</strong> for her doctoral thesis titled <em>"Hybrid Model for the Detection of Heart Disease from Electrocardiogram Signal"</em>. She completed her <strong>MS in Applied Artificial Intelligence</strong> from the University of San Diego, USA (2026) and holds an <strong>MBA in Business Analytics</strong>.
                  </p>
                  <p>
                    Her research portfolio bridges the intersection of <em>Applied Artificial Intelligence, Medical ECG Signal Processing, Blockchain Distributed Ledgers, and Cryptographic Security</em>. She has authored over 45+ peer-reviewed scholarly publications, 4 published patents, and serves as the Principal Investigator on funded research grants.
                  </p>
                  <p>
                    In recognition of her extraordinary contributions to engineering education, research innovation, and academic administration, she was conferred the prestigious <strong>Sir M. Visvesvaraya Outstanding Engineer Award 2023</strong> and is an elected <strong>Fellow of IETE (F-501487)</strong>.
                  </p>
                </div>
              </div>

              {/* Strategic Leadership Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="mac-card rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-academic-500/10 text-academic-600 dark:text-academic-400 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Research & Innovation</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Author of 45+ indexed publications, 4 published patents, and PI for major funded research initiatives.
                  </p>
                </div>

                <div className="mac-card rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Doctoral Research Supervision</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Recognized Ph.D. research guide at Dr. BAMU, supervising doctoral scholars and 30+ M.E. dissertations.
                  </p>
                </div>

                <div className="mac-card rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Institutional Governance</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Steering autonomous academic boards, NBA tier accreditation, and NAAC institutional evaluations.
                  </p>
                </div>

                <div className="mac-card rounded-2xl p-5 space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Professional Societies</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    IETE Fellow (F-501487), Life Member of ISTE (LM-33671), and Life Member of CSI (00155050).
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Section 2: Complete Educational Qualifications Timeline */}
          <div className="mac-card rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Academic Educational Background
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Doctoral research, international postgraduate studies, and engineering degrees
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/50 dark:bg-navy-900/30 border border-slate-200/60 dark:border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono font-bold text-academic-600 dark:text-academic-400 bg-academic-500/10 px-2.5 py-1 rounded-full w-fit">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Professional Experience & Leadership Timeline */}
          <div className="mac-card rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Career Experience & Leadership Trajectory
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Over 24+ years of distinguished teaching, laboratory setup, and departmental headship
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/50 dark:bg-navy-900/30 border border-slate-200/60 dark:border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {exp.institution}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
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

export default AboutPage;
