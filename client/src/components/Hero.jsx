import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Award, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  CheckCircle2,
  ExternalLink 
} from 'lucide-react';

const Hero = ({ profile }) => {
  const stats = [
    { label: 'Years Experience', value: `${profile?.stats?.experienceYears || 24}+` },
    { label: 'Publications', value: `${profile?.stats?.publicationsCount || 42}+` },
    { label: 'Citations', value: `${profile?.stats?.citationsCount || 410}+` },
    { label: 'h-Index', value: `${profile?.stats?.hIndex || 12}` },
  ];

  const focusPills = [
    'Artificial Intelligence',
    'Machine Learning',
    'Blockchain Systems',
    'Cyber Security',
    'Cloud & Edge IoT'
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Mesh & Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-academic-500/10 dark:bg-academic-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Honor Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Sir M. Visvesvaraya Outstanding Engineer Awardee 2023</span>
            </div>

            {/* Main Greeting & Heading */}
            <div className="space-y-3">
              <h2 className="text-base sm:text-lg font-semibold text-academic-600 dark:text-academic-400 uppercase tracking-wider font-mono">
                Hello, I'm
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Dr. Smita <span className="text-transparent bg-clip-text bg-gradient-to-r from-academic-600 to-academic-400 dark:from-academic-400 dark:to-academic-200">Kasar</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                Professor, Researcher & Innovator in Computer Science
              </p>
            </div>

            {/* Short Bio Subtitle */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile?.shortBio || "Distinguished academician, researcher, and author with over 24+ years of expertise in Computer Science and Engineering, specializing in Applied Artificial Intelligence, Machine Learning, Healthcare Informatics, and Blockchain Systems."}
            </p>

            {/* Research Focus Chips */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
              {focusPills.map((pill) => (
                <span
                  key={pill}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-navy-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-academic-600 hover:bg-academic-700 text-white shadow-lg shadow-academic-600/25 hover:shadow-academic-600/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Know More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/publications"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-academic-500" />
                <span>Publications</span>
              </Link>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/80">
              {stats.map((item, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-academic-600 dark:text-academic-400 font-display">
                    {item.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image / Scholar Profile Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow Ring */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-academic-500/20 via-amber-500/20 to-blue-500/20 blur-xl opacity-75 dark:opacity-50" />
              
              <div className="relative rounded-3xl overflow-hidden glass-card shadow-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 space-y-5">
                
                {/* Profile Avatar / Portrait */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-navy-900 dark:to-navy-850 border border-slate-200 dark:border-slate-700 shadow-inner">
                  <img
                    src="/smita-kasar.jpg"
                    alt="Dr. Smita Lalit Kasar - Professor in Computer Science"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Verified Badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Ph.D. Computer Engineering</span>
                  </div>
                </div>

                {/* Card Info Box */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      Dr. Smita Lalit Kasar
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                      HOD & Professor
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                    <span>Dr. BAMU University</span>
                    <span className="font-mono text-academic-600 dark:text-academic-400">Autonomous • NBA / NAAC</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
