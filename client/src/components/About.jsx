import React from 'react';
import { 
  FileText, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Lightbulb, 
  Download, 
  ShieldCheck, 
  Globe, 
  Sparkles 
} from 'lucide-react';

const About = ({ profile, onOpenResume }) => {
  const academicProfiles = [
    {
      name: 'Google Scholar',
      id: 'drsmitakasar',
      url: profile?.socialLinks?.googleScholar || 'https://scholar.google.com/citations?user=drsmitakasar',
      desc: 'Citations, h-Index & Metrics',
      color: 'from-blue-600 to-indigo-600',
      badge: '420+ Citations'
    },
    {
      name: 'Scopus Author ID',
      id: '57200000000',
      url: profile?.socialLinks?.scopus || 'https://www.scopus.com',
      desc: 'Indexed SCI/Scopus Papers',
      color: 'from-orange-600 to-amber-600',
      badge: 'Scopus Indexed'
    },
    {
      name: 'ORCID Identifier',
      id: '0000-0002-1234-5678',
      url: profile?.socialLinks?.orcid || 'https://orcid.org/0000-0002-1234-5678',
      desc: 'Verified Researcher Record',
      color: 'from-emerald-600 to-teal-600',
      badge: 'Open Researcher'
    },
    {
      name: 'ResearchGate',
      id: 'Smita-Kasar',
      url: profile?.socialLinks?.researchGate || 'https://www.researchgate.net',
      desc: 'Preprints & Academic Network',
      color: 'from-teal-600 to-cyan-600',
      badge: 'Research Score'
    },
    {
      name: 'LinkedIn Academic',
      id: 'dr-smita-kasar',
      url: profile?.socialLinks?.linkedin || 'https://www.linkedin.com',
      desc: 'Professional & Alumni Connect',
      color: 'from-sky-700 to-blue-800',
      badge: '10K+ Network'
    }
  ];

  const highlights = [
    { title: '20+ Years Excellence', desc: 'Distinguished track record in teaching, academic leadership, and curriculum design.' },
    { title: 'Ph.D. & PG Research Guide', desc: 'Guided multiple doctoral scholars and 25+ post-graduate dissertations in CSE.' },
    { title: 'Funded Project Leader', desc: 'Principal Investigator for AICTE RPS & SPPU research grants worth lakhs.' },
    { title: 'Patents & Intellectual Property', desc: 'Published and filed 5 innovation patents in AI, IoT, and healthcare systems.' }
  ];

  return (
    <section id="about" className="py-24 relative bg-slate-50/50 dark:bg-navy-950/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Profile & Biography</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Dr. Smita Lalit Kasar
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Empowering student scholars, innovating in AI/ML & Blockchain, and fostering institutional research excellence.
          </p>
        </div>

        {/* Main Grid: Biography + Academic Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Full Biography & Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Biography & Academic Leadership</span>
              </h3>

              <div className="text-slate-600 dark:text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  {profile?.fullBio || `Dr. Smita Lalit Kasar is a renowned Professor and Head of Department in Computer Science & Engineering at Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar. She holds a Ph.D. in Computer Science & Engineering from Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU).`}
                </p>
                <p>
                  With over two decades of transformative contributions to higher technical education, Dr. Kasar has published over 45+ scholarly articles in high-impact IEEE, Springer, Elsevier, and Scopus-indexed journals. Her research portfolio bridges the domains of Artificial Intelligence, Deep Learning, Biomedical Image Analysis, Decentralized Blockchain architectures, and Cyber Security.
                </p>
                <p>
                  In 2023, she was honored with the prestigious <strong>Sir M. Visvesvaraya Outstanding Engineer Award</strong> for her relentless dedication to academic innovation, laboratory research setups, student mentorship in national hackathons, and institutional leadership.
                </p>
              </div>

              {/* Action Buttons: Resume Modal & Download */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-academic-600 hover:bg-academic-700 text-white shadow-md shadow-academic-600/20 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Curriculum Vitae (PDF)</span>
                </button>

                <a
                  href="/Dr_Smita_Kasar_Resume.pdf"
                  download="Dr_Smita_Kasar_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Key Milestone Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div key={idx} className="glass-card rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-academic-500" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Academic & Research Profiles (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-academic-500" />
                  <span>Scholarly Index Profiles</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">Official Links</span>
              </div>

              <div className="space-y-3">
                {academicProfiles.map((prof, idx) => (
                  <a
                    key={idx}
                    href={prof.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3.5 rounded-xl bg-slate-50 dark:bg-navy-900/60 hover:bg-white dark:hover:bg-navy-800 border border-slate-200/80 dark:border-slate-700/60 hover:border-academic-500 dark:hover:border-academic-500 transition-all hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${prof.color} flex items-center justify-center text-white shadow-sm font-mono text-xs font-bold`}>
                          {prof.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-academic-600 dark:group-hover:text-academic-400 flex items-center gap-1.5 transition-colors">
                            <span>{prof.name}</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {prof.desc}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {prof.badge}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Research Affiliation Card */}
              <div className="p-4 rounded-xl bg-academic-50/60 dark:bg-academic-950/40 border border-academic-200 dark:border-academic-900 space-y-1.5">
                <div className="text-xs font-bold text-academic-800 dark:text-academic-300 uppercase tracking-wide">
                  Department Leadership
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {profile?.affiliation?.department || 'Department of Computer Science & Engineering'}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {profile?.affiliation?.institution || 'Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar'}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
