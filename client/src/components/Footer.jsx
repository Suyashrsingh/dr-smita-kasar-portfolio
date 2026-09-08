import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ArrowUp, 
  Lock, 
  ExternalLink,
  Mail,
  ShieldCheck
} from 'lucide-react';

const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Publications', path: '/publications' },
    { name: 'Awards & Achievements', path: '/awards' },
    { name: 'Research', path: '/research' },
    { name: 'Events & Keynotes', path: '/events' },
    { name: 'E-Content & Quizzes', path: '/e-content' },
    { name: 'Contact Office', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Scopus (55370475800)', url: profile?.socialLinks?.scopus || 'https://www.scopus.com/authid/detail.url?authorId=55370475800' },
    { name: 'ORCID', url: profile?.socialLinks?.orcid || 'https://orcid.org/0000-0002-6441-9658' },
    { name: 'Google Scholar', url: profile?.socialLinks?.googleScholar || 'https://scholar.google.co.in/citations?user=drsmitakasar' },
    { name: 'ResearchGate', url: profile?.socialLinks?.researchGate || 'https://www.researchgate.net/profile/Smita-Kasar' },
    { name: 'LinkedIn', url: profile?.socialLinks?.linkedin || 'https://www.linkedin.com/in/dr-smita-kasar' },
  ];

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 relative transition-colors duration-200">
      
      {/* Back to Top Floating Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="absolute -top-5 right-8 w-10 h-10 rounded-full mac-btn-primary text-white flex items-center justify-center shadow-lg transition-all cursor-pointer z-10"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Tagline (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-academic-600 to-sky-400 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Dr. Smita Lalit Kasar
              </span>
            </div>

            <p className="text-sm font-semibold text-academic-600 dark:text-academic-400 italic">
              "Dedicated to Research, Innovation, and Excellence in Education."
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Professor & Head of Department, Computer Science & Engineering at Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar (An Autonomous Institute, Affiliated to Dr. BAMU).
            </p>

            {/* Social / Scholarly Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold mac-btn-glass text-slate-700 dark:text-slate-300 hover:text-academic-600 dark:hover:text-academic-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-600 dark:text-slate-400 hover:text-academic-600 dark:hover:text-academic-400 transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Portal & Security (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Administration
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Protected portal for managing publications, events, tests, notes, and inquiries.
            </p>

            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold mac-btn-glass text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-academic-500" />
              <span>Admin Management Portal</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} Dr. Smita Lalit Kasar. All Rights Reserved.
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Maharashtra Institute of Technology, Chhatrapati Sambhajinagar
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
