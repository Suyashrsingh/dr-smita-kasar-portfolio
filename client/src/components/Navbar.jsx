import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Mail, 
  Lock, 
  ChevronRight,
  User,
  BookOpen,
  Trophy,
  Cpu,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Publications', path: '/publications' },
    { name: 'Awards & Achievements', path: '/awards' },
    { name: 'Research', path: '/research' },
    { name: 'Events', path: '/events' },
    { name: 'E-Content', path: '/e-content' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <div className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 ${
        isScrolled 
          ? 'mac-dock shadow-xl py-2 px-4 sm:px-6' 
          : 'mac-glass py-2.5 px-4 sm:px-6 shadow-md'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with macOS Traffic Light Dots Accent */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* macOS Window Controls Mini Dots */}
            <div className="hidden sm:flex items-center gap-1.5 pr-1 opacity-70 group-hover:opacity-100 transition-opacity">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-xs" />
            </div>

            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-academic-600 via-academic-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-academic-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>

            <div className="leading-tight">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Dr. Smita Kasar
              </span>
              <p className="text-[10px] font-semibold text-academic-600 dark:text-academic-400">
                Professor & Head, CSE (MIT)
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/60 dark:bg-navy-900/60 p-1 rounded-full border border-slate-200/50 dark:border-white/5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-academic-600 text-white shadow-md shadow-academic-600/30'
                      : 'text-slate-700 dark:text-slate-200 hover:text-academic-600 dark:hover:text-academic-400 hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/10 mac-btn-glass transition-all cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Admin Portal Link */}
            <Link
              to="/admin"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white transition-all cursor-pointer ${
                isAuthenticated 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20' 
                  : 'mac-btn-primary'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>{isAuthenticated ? 'CMS' : 'Admin'}</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 mac-btn-glass"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 mac-btn-glass"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glass Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto mac-dock rounded-2xl p-4 animate-slide-up shadow-2xl">
          <div className="grid grid-cols-1 gap-1.5 mb-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-academic-600 text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200/60 dark:border-white/10">
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white mac-btn-primary"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin Panel Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
