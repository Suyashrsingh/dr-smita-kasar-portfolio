import React from 'react';
import { GraduationCap, Award, Calendar, Building, Sparkles } from 'lucide-react';

const Education = ({ education = [] }) => {
  const defaultEdu = [
    {
      degree: "MS in Applied Artificial Intelligence",
      institution: "University of San Diego, USA (Online Mode)",
      year: "2026",
      specialization: "Applied Artificial Intelligence, Machine Learning & Neural Networks",
      description: "Advanced study in generative AI, deep reinforcement learning, computer vision, and ethical AI architecture."
    },
    {
      degree: "MBA in Business Analytics",
      institution: "D.Y. Patil University, Pune (Online Mode)",
      year: "April 2025",
      specialization: "Business Analytics & Big Data Strategy (Grade 'A')",
      description: "Focused on data-driven enterprise decision systems, predictive analytics, and executive technological management."
    },
    {
      degree: "Ph.D. in Computer Science & Engineering",
      institution: "Government Engineering College, Aurangabad (Dr. BAMU)",
      year: "December 2016",
      specialization: "Medical Signal Processing & Machine Learning",
      description: "Guided by Dr. M. S. Joshi. Doctoral Thesis: 'Hybrid Model for the Detection of Heart Disease from Electrocardiogram Signal'. Developed novel multi-lead QRS point scoring and decision tree algorithms."
    },
    {
      degree: "Master of Engineering (M.E.) in CSE",
      institution: "Government Engineering College, Aurangabad (Dr. BAMU)",
      year: "May 2010",
      specialization: "Computer Science & Engineering (First Class with Distinction)",
      description: "Master's Thesis: 'Optimization of nonlinear programming problems using non-traditional method: Genetic Algorithms'."
    },
    {
      degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
      institution: "Datta Meghe College of Engineering, Airoli (Mumbai University)",
      year: "June 2000",
      specialization: "Computer Engineering (First Class)",
      description: "Graduated with First Class honors in software systems, operating platforms, algorithms, and computing hardware."
    }
  ];

  const items = Array.isArray(education) ? education : defaultEdu;

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Educational Background
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Degrees, doctoral research, and specialized qualifications from premier universities.
          </p>
        </div>

        {/* Timeline / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((edu, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-2xl p-6 relative border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between"
            >
              {/* Year Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-academic-100 dark:bg-academic-950 text-academic-600 dark:text-academic-400 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
                    <Calendar className="w-3 h-3 text-academic-500" />
                    <span>{edu.year}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-academic-600 dark:group-hover:text-academic-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-academic-600 dark:text-academic-400 font-semibold mt-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{edu.institution}</span>
                  </div>
                </div>

                {edu.specialization && (
                  <div className="px-3 py-1.5 rounded-lg bg-slate-100/70 dark:bg-navy-900/60 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60">
                    <strong className="text-academic-700 dark:text-academic-300">Specialization:</strong> {edu.specialization}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {edu.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Verified Credential</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Distinction / Honors</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
