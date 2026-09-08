import React from 'react';
import { Briefcase, Calendar, Building, CheckCircle2, Award, ChevronRight } from 'lucide-react';

const Experience = ({ experience = [] }) => {
  const defaultExp = [
    {
      role: "Professor & Head of Department (HOD)",
      institution: "Department of Computer Science & Engineering, Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar",
      period: "June 2023 - Present",
      type: "Academic & Administrative Leadership",
      highlights: [
        "Leading the Department of Computer Science & Engineering (Basic Level 14, 7th CPC) at an autonomous engineering institution.",
        "Overseeing autonomous curriculum formulation, faculty development, research laboratories, and Ph.D. research supervision.",
        "Guiding doctoral candidates registered under Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU).",
        "Driving high-impact industry collaborations, state-of-the-art AI & Cyber Security CoE labs, and research grant execution."
      ]
    },
    {
      role: "Associate Professor and Head of Department",
      institution: "Department of Computer Science & Engineering, G.S. Mandal's MIT, Aurangabad",
      period: "August 2018 - May 2023",
      type: "Departmental Administration & Research",
      highlights: [
        "Led NBA accreditation and NAAC institutional tier evaluations with stellar distinction.",
        "Spearheaded the development of healthcare AI diagnostic prototypes and blockchain decentralized research pipelines.",
        "Supervised 30+ M.E. dissertations and coordinated university examination boards and curriculum committees."
      ]
    },
    {
      role: "Assistant Professor & Lecturer in Computer Engineering",
      institution: "Maharashtra Institute of Technology (MIT), Aurangabad",
      period: "July 2004 - July 2018",
      type: "Teaching & Laboratory Instruction",
      highlights: [
        "Taught Machine Learning, Artificial Intelligence, Optimization Algorithms, and Data Structures.",
        "Authored 25+ Scopus/SCI journal papers and published book chapters in Springer and IGI Global.",
        "Awarded Best Teacher Honor for outstanding academic delivery and student mentorship."
      ]
    },
    {
      role: "Lecturer in Computer Engineering",
      institution: "Jawahar Education Society's Institute of Technology, Pune",
      period: "August 2001 - June 2004",
      type: "Foundational Instruction",
      highlights: [
        "Conducted lectures and laboratory sessions in C/C++ programming, Data Structures, and System Software."
      ]
    }
  ];

  const items = experience && experience.length > 0 ? experience : defaultExp;

  return (
    <section id="experience" className="py-24 relative bg-slate-50/60 dark:bg-navy-950/60 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Leadership & Experience
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Over 20+ years of distinguished administrative, teaching, and research experience in Computer Engineering.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-slate-200 dark:before:bg-slate-800">
          
          {items.map((exp, idx) => (
            <div 
              key={idx} 
              className={`relative flex flex-col md:flex-row gap-6 items-start ${
                idx % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-4 border-academic-500 flex items-center justify-center text-academic-500 shadow-md z-10">
                <div className="w-2 h-2 rounded-full bg-academic-500" />
              </div>

              {/* Experience Card */}
              <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)] w-full">
                <div className="glass-card rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 text-academic-700 dark:text-academic-300 text-xs font-semibold font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-academic-600 dark:text-academic-400 font-semibold mt-1 mb-4">
                    <Building className="w-3.5 h-3.5" />
                    <span>{exp.institution}</span>
                  </div>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      {exp.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-academic-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Experience;
