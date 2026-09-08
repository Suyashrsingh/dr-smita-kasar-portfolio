import React from 'react';
import { X, Download, ExternalLink, FileText, Printer, CheckCircle2, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

const ResumeModal = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full h-[92vh] mac-card rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        
        {/* macOS Style Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-white/10 mac-dock">
          <div className="flex items-center gap-3">
            <div className="mac-traffic-lights">
              <span className="mac-dot red" onClick={onClose} title="Close" />
              <span className="mac-dot yellow" onClick={handlePrint} title="Print" />
              <span className="mac-dot green" title="Curriculum Vitae" />
            </div>
            <div className="pl-2 border-l border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-academic-500" />
                <span>Curriculum Vitae — Dr. Smita Lalit Kasar</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Professor & Head of Department, Computer Science & Engineering (MIT)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              title="Print Curriculum Vitae"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 mac-btn-glass cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>

            <a
              href="/SLK_resume.doc"
              download="Dr_Smita_Lalit_Kasar_Resume.doc"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold mac-btn-primary text-white shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Word Doc</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Complete Curriculum Vitae from SLK resume.doc */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 bg-slate-100/50 dark:bg-navy-950/50 font-sans">
          <div className="max-w-3xl mx-auto bg-white dark:bg-navy-900/90 rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200/80 dark:border-white/10 space-y-7 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            
            {/* 1. Header Banner */}
            <div className="border-b border-slate-200 dark:border-white/10 pb-6 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-academic-600 dark:text-academic-400">
                Official Curriculum Vitae
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Dr. SMITA LALIT KASAR
              </h1>
              <p className="text-xs sm:text-sm font-bold text-academic-700 dark:text-academic-300">
                Professor & Head, Department of Computer Science & Engineering
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Maharashtra Institute of Technology (An Autonomous Institute), Chhatrapati Sambhajinagar, Maharashtra
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-mono pt-2 text-slate-600 dark:text-slate-400">
                <span>E-mail: <strong>smitakasar@gmail.com</strong>, <strong>smita.kasar@mit.asia</strong></span>
                <span>•</span>
                <span>Mobile: <strong>+91 9923432229</strong></span>
                <span>•</span>
                <span>Landline: <strong>0240 - 2375270</strong></span>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px] font-semibold text-academic-600 dark:text-academic-400">
                <span className="px-2.5 py-1 rounded-md bg-academic-50 dark:bg-white/5 border border-academic-200/50 dark:border-white/10">
                  Scopus ID: 55370475800
                </span>
                <span className="px-2.5 py-1 rounded-md bg-academic-50 dark:bg-white/5 border border-academic-200/50 dark:border-white/10">
                  ORCID: 0000-0002-6441-9658
                </span>
                <span className="px-2.5 py-1 rounded-md bg-academic-50 dark:bg-white/5 border border-academic-200/50 dark:border-white/10">
                  IETE Fellow (F-501487)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-academic-50 dark:bg-white/5 border border-academic-200/50 dark:border-white/10">
                  Life Member: ISTE (LM-33671), CSI (00155050)
                </span>
              </div>
            </div>

            {/* 2. Educational Qualification Table */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider border-b border-academic-200/50 dark:border-white/10 pb-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Educational Qualifications</span>
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 font-bold text-slate-800 dark:text-slate-200">
                      <th className="p-2.5">Qualification</th>
                      <th className="p-2.5">Institution</th>
                      <th className="p-2.5">University / Board</th>
                      <th className="p-2.5">Passing Year</th>
                      <th className="p-2.5">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    <tr>
                      <td className="p-2.5 font-semibold">MS (Applied Artificial Intelligence)</td>
                      <td className="p-2.5">Online Mode</td>
                      <td className="p-2.5">University of San Diego, USA</td>
                      <td className="p-2.5 font-mono">2026</td>
                      <td className="p-2.5 font-semibold text-emerald-600 dark:text-emerald-400">Completed</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">MBA (Business Analytics)</td>
                      <td className="p-2.5">Online Mode</td>
                      <td className="p-2.5">D.Y. Patil University, Pune</td>
                      <td className="p-2.5 font-mono">April 2025</td>
                      <td className="p-2.5 font-bold text-emerald-600">Grade 'A'</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Ph.D. in CSE (Guide: Dr. M. S. Joshi)</td>
                      <td className="p-2.5">Govt. Engineering College, Aurangabad</td>
                      <td className="p-2.5">Dr. BAMU</td>
                      <td className="p-2.5 font-mono">Dec 2016</td>
                      <td className="p-2.5 font-bold text-academic-600">Awarded</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">M.E. (Computer Science & Engg.)</td>
                      <td className="p-2.5">Govt. Engineering College, Aurangabad</td>
                      <td className="p-2.5">Dr. BAMU</td>
                      <td className="p-2.5 font-mono">May 2010</td>
                      <td className="p-2.5 font-bold text-emerald-600">Distinction</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">B.E. (Computer Engineering)</td>
                      <td className="p-2.5">Datta Meghe College of Engg., Airoli</td>
                      <td className="p-2.5">Mumbai University</td>
                      <td className="p-2.5 font-mono">June 2000</td>
                      <td className="p-2.5 font-bold">First Class</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">Diploma (Computer Technology)</td>
                      <td className="p-2.5">Institute of Technology</td>
                      <td className="p-2.5">MSBTE</td>
                      <td className="p-2.5 font-mono">April 1997</td>
                      <td className="p-2.5 font-bold text-emerald-600">Distinction</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-semibold">S.S.C</td>
                      <td className="p-2.5">Gurunanak High School, Ulhasnagar</td>
                      <td className="p-2.5">Maharashtra Board</td>
                      <td className="p-2.5 font-mono">March 1994</td>
                      <td className="p-2.5 font-bold text-emerald-600">Distinction</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <p><strong>Ph.D. Thesis:</strong> <em>"Hybrid Model for the Detection of Heart Disease from Electrocardiogram Signal"</em> under Dr. M. S. Joshi, Dr. BAMU.</p>
                <p><strong>M.E. Dissertation:</strong> <em>"Optimization of nonlinear programming problems using non-traditional method: Genetic Algorithms"</em>, Govt. Engg. College, Aurangabad.</p>
              </div>
            </div>

            {/* 3. Professional Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider border-b border-academic-200/50 dark:border-white/10 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </h2>

              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white">Professor and Head, Dept. of Computer Science & Engineering</strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400">G.S. Mandal’s Maharashtra Institute of Technology (MIT), Aurangabad, Maharashtra</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-academic-600 whitespace-nowrap">June 2023 - Present</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white">Associate Professor and Head, Dept. of Computer Science & Engineering</strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400">G.S. Mandal’s Maharashtra Institute of Technology (MIT), Aurangabad, Maharashtra</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 whitespace-nowrap">Aug 2018 - May 2023</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white">Associate Professor, Dept. of Computer Science & Engineering</strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400">G.S. Mandal’s Maharashtra Institute of Technology (MIT), Aurangabad, Maharashtra</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 whitespace-nowrap">Nov 2017 - Aug 2018</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white">Assistant Professor, Dept. of Computer Science & Engineering</strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400">MGM’s JNEC, Aurangabad, Maharashtra</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 whitespace-nowrap">Feb 2002 - Nov 2017</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    <strong className="text-slate-900 dark:text-white">Lecturer, M.Sc. (Computer Science & IT)</strong>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Deogiri College, Aurangabad, Maharashtra</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 whitespace-nowrap">July 2001 - Jan 2002</span>
                </div>
              </div>
            </div>

            {/* 4. Major Achievements, Grants & Invited Talks */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-academic-600 dark:text-academic-400 uppercase tracking-wider border-b border-academic-200/50 dark:border-white/10 pb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Achievements, Grants & Invited Lectures</span>
              </h2>

              <ul className="space-y-2 list-disc list-inside text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <li><strong>Sir M. Visvesvaraya Outstanding Engineer Award 2023</strong> conferred by The Institution of Engineers (India), Aurangabad Local Centre on 15th Sept 2023.</li>
                <li><strong>Patent Granted (57090)</strong> for <em>'Robotic Fish for Underwater Surveillance'</em> on 22nd September 2025.</li>
                <li><strong>Mentor for Team Divine Devs</strong> in Smart India Hackathon (SIH 2023) - Won <strong>1st Prize of Rs. 1 Lakh</strong> in Senior Software Edition at Meerut.</li>
                <li><strong>RGSTC Research Grant:</strong> Received Rs. 3.8 Lakhs for <em>"Diskless client using open-source tech for school education"</em> from RGSTC, Dr. BAMU (implemented in ZP school, Sudamwadi, Dist. Vaijapur and inaugurated by VC Dr. Pramod Yeole).</li>
                <li><strong>UGC Minor Research Project Grant:</strong> Approved during XII Plan with total allocation of Rs. 1,50,000/-.</li>
                <li><strong>Keynote Lecture:</strong> Delivered session on <em>"AI: Impact on Manufacturing Industry"</em> at Marathwada Auto Cluster (10 Feb 2025).</li>
                <li><strong>Keynote Lecture:</strong> Delivered session on <em>"AI insights: Application and Benefits"</em> in meeting of Laghu Udyog Bharti, Jalna (1st Sept 2024).</li>
                <li><strong>Doctoral Resource Person:</strong> Delivered technical sessions on <em>"Backpropagation Learning Algorithm"</em> in Online Pre-PhD Course work, Dr. BAMU (20th April 2024).</li>
                <li><strong>Reviewer for Postdoctoral Fellowship:</strong> SyMeCo, Marie Skłodowska-Curie COFUND fellowship at Lero, Science Foundation Ireland Research Centre for Software, Ireland (2023).</li>
                <li><strong>Copyright Registration:</strong> Registered for Biomedical Waste Management Audit Tool (software), Registration: SW-12097/2019.</li>
                <li><strong>NBA Program Coordinator:</strong> Guided CSE Department to attain NBA accreditation for 3 academic years (2022-23, 2023-24, and 2024-25).</li>
                <li><strong>Board of Studies (BoS):</strong> Incharge Chairman, BoS in CSE, Dr. BAMU (from 6/6/2025); BoS Member PG CSE Dr. BAMU.</li>
              </ul>
            </div>

            {/* 5. Download Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-500">
                Official document verified and authorized by Dr. Smita Lalit Kasar
              </span>
              <a
                href="/SLK_resume.doc"
                download="SLK_Resume_Dr_Smita_Kasar.doc"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold mac-btn-primary text-white cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download SLK Resume (.doc)</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ResumeModal;
