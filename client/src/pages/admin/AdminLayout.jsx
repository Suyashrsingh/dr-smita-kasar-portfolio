import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Image as ImageIcon, 
  Award, 
  Presentation, 
  Layers, 
  FileCheck,
  Bell,
  MessageSquare, 
  UserCog, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Publications & Papers', path: '/admin/publications', icon: BookOpen },
    { name: 'Online Tests & Quizzes', path: '/admin/tests', icon: FileCheck },
    { name: 'Notices & Study Material', path: '/admin/articles', icon: Bell },
    { name: 'Photo Moments Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Awards & Honors', path: '/admin/awards', icon: Award },
    { name: 'Workshops & FDPs', path: '/admin/workshops', icon: Presentation },
    { name: 'Funded Projects', path: '/admin/projects', icon: Layers },
    { name: 'Inquiries & Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Profile & Settings', path: '/admin/profile', icon: UserCog },
  ];

  return (
    <div className="min-h-screen ambient-mesh flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 mac-dock border-b border-slate-200/60 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-academic-600 to-sky-400 text-white flex items-center justify-center shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm text-slate-900 dark:text-white">Admin CMS</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:bg-white/40 dark:hover:bg-white/10"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white/40 dark:hover:bg-white/10"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-68 mac-dock border-r border-slate-200/80 dark:border-white/10 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static transition-transform duration-200 flex flex-col justify-between`}>
        
        <div className="p-5 space-y-6">
          
          {/* macOS Titlebar & Traffic Lights */}
          <div className="flex items-center justify-between pt-1">
            <div className="mac-traffic-lights">
              <span className="mac-dot red" onClick={handleLogout} title="Sign Out" />
              <span className="mac-dot yellow" onClick={() => navigate('/')} title="Go Home" />
              <span className="mac-dot green" title="Admin Active" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              macOS CMS
            </span>
          </div>

          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-academic-600 via-academic-500 to-sky-400 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">Dr. Smita Kasar</span>
                <span className="text-[11px] font-semibold text-academic-600 dark:text-academic-400">Admin Control Center</span>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-academic-600 text-white shadow-md shadow-academic-600/25'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info & Logout */}
        <div className="p-5 border-t border-slate-200/60 dark:border-white/10 space-y-3">
          
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/5 transition-colors"
          >
            <span>Live Portfolio Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-academic-500" />
          </Link>

          <div className="flex items-center justify-between px-3 py-2 rounded-xl mac-glass text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span>Interface Mode</span>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">{admin?.name || 'Dr. Smita Kasar'}</span>
              <span className="text-slate-500 text-[11px] font-mono">{admin?.email || 'admin@drsmitakasar.edu'}</span>
            </div>
            
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
