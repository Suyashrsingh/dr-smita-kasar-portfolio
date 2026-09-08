import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Image as ImageIcon, 
  Award, 
  Presentation, 
  Layers, 
  FileCheck,
  Bell,
  MessageSquare, 
  UserCog, 
  Database, 
  CheckCircle2, 
  Plus, 
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { dashboardService, messageService } from '../../services/api';
import {
  initialPublications,
  initialAwards,
  initialWorkshops,
  initialProjects,
  initialGallery,
  initialTests,
  initialArticles
} from '../../data/fallbackData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    publicationsCount: initialPublications.length,
    awardsCount: initialAwards.length,
    workshopsCount: initialWorkshops.length,
    projectsCount: initialProjects.length,
    galleryCount: initialGallery.length,
    testsCount: initialTests.length,
    articlesCount: initialArticles.length,
    totalMessages: 0,
    unreadMessages: 0,
    databaseStatus: 'MongoDB Atlas (Connected)'
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsRes, msgsRes] = await Promise.allSettled([
          dashboardService.getStats(),
          messageService.getAll()
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value.data?.success) {
          setStats(statsRes.value.data.data);
        }
        if (msgsRes.status === 'fulfilled' && msgsRes.value.data?.success) {
          setRecentMessages(msgsRes.value.data.data.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = [
    { title: 'Publications', count: stats.publicationsCount, link: '/admin/publications', icon: BookOpen, color: 'from-blue-600 to-indigo-600' },
    { title: 'Online Tests & Quizzes', count: stats.testsCount, link: '/admin/tests', icon: FileCheck, color: 'from-emerald-600 to-teal-600' },
    { title: 'Notices & Study Notes', count: stats.articlesCount, link: '/admin/articles', icon: Bell, color: 'from-indigo-600 to-violet-600' },
    { title: 'Gallery Items', count: stats.galleryCount, link: '/admin/gallery', icon: ImageIcon, color: 'from-purple-600 to-pink-600' },
    { title: 'Awards & Honors', count: stats.awardsCount, link: '/admin/awards', icon: Award, color: 'from-amber-500 to-orange-600' },
    { title: 'Workshops / FDPs', count: stats.workshopsCount, link: '/admin/workshops', icon: Presentation, color: 'from-teal-600 to-cyan-600' },
    { title: 'Funded Projects', count: stats.projectsCount, link: '/admin/projects', icon: Layers, color: 'from-sky-600 to-blue-700' },
    { title: 'Inquiries & Messages', count: stats.totalMessages, badge: stats.unreadMessages > 0 ? `${stats.unreadMessages} New` : null, link: '/admin/messages', icon: MessageSquare, color: 'from-rose-600 to-pink-600' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Welcome, Dr. Smita Kasar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Academic Portfolio Control Center • Manage publication visibility, tests, and research output
          </p>
        </div>

        {/* Database Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold">
          <Database className="w-4 h-4 text-emerald-500" />
          <span className="text-slate-700 dark:text-slate-300">{stats.databaseStatus}</span>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all hover:shadow-lg group flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {card.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
                    {card.count ?? 0}
                  </span>
                  {card.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold animate-pulse">
                      {card.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Contact Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Inquiries (8 cols) */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-academic-500" />
              <span>Recent Inquiries & Scholar Messages</span>
            </h3>
            <Link to="/admin/messages" className="text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No contact inquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    !msg.isRead 
                      ? 'bg-academic-50/60 dark:bg-academic-950/40 border-academic-200 dark:border-academic-800' 
                      : 'bg-white dark:bg-navy-900 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {msg.name} ({msg.email})
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                    {msg.subject}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Quick Actions (4 cols) */}
        <div className="lg:col-span-4 glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Publishing Controls</span>
          </h3>

          <div className="space-y-2.5">
            <Link
              to="/admin/tests"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>+ Create Online Test / Exam</span>
              <Plus className="w-4 h-4 text-emerald-500" />
            </Link>

            <Link
              to="/admin/articles"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>+ Publish Notice / Notes</span>
              <Plus className="w-4 h-4 text-indigo-500" />
            </Link>

            <Link
              to="/admin/publications"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>+ Add Research Publication</span>
              <Plus className="w-4 h-4 text-academic-500" />
            </Link>

            <Link
              to="/admin/gallery"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>+ Upload Gallery Photo</span>
              <Plus className="w-4 h-4 text-academic-500" />
            </Link>

            <Link
              to="/admin/profile"
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-900/60 hover:bg-slate-100 dark:hover:bg-navy-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>Edit Biography & Links</span>
              <UserCog className="w-4 h-4 text-academic-500" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
