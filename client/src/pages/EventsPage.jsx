import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import { 
  Calendar, 
  Presentation, 
  Camera, 
  MapPin, 
  Award, 
  Sparkles, 
  Search, 
  ExternalLink, 
  X, 
  ChevronRight,
  Filter,
  Users,
  Mic
} from 'lucide-react';
import { workshopService, galleryService, profileService } from '../services/api';
import { initialWorkshops, initialGallery, initialProfile } from '../data/fallbackData';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'keynotes', 'workshops', 'gallery'
  const [searchQuery, setSearchQuery] = useState('');
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [gallery, setGallery] = useState(initialGallery);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.allSettled([
      workshopService.getAll(),
      galleryService.getAll(),
      profileService.getProfile()
    ]).then(([wkpRes, galRes, profRes]) => {
      if (wkpRes.status === 'fulfilled' && Array.isArray(wkpRes.value.data?.data) && wkpRes.value.data.data.length > 0) {
        setWorkshops(wkpRes.value.data.data);
      }
      if (galRes.status === 'fulfilled' && Array.isArray(galRes.value.data?.data) && galRes.value.data.data.length > 0) {
        setGallery(galRes.value.data.data);
      }
      if (profRes.status === 'fulfilled' && profRes.value.data?.data?.profile) {
        setProfile(profRes.value.data.data.profile);
      }
    }).finally(() => setLoading(false));
  }, []);

  // Filtered workshops & keynotes
  const filteredEvents = useMemo(() => {
    return workshops.filter(item => {
      const isKeynote = item.type?.toLowerCase().includes('keynote') || item.type?.toLowerCase().includes('speaker') || item.role?.toLowerCase().includes('resource');
      const matchesTab = 
        activeTab === 'all' ? true :
        activeTab === 'keynotes' ? isKeynote :
        activeTab === 'workshops' ? !isKeynote : true;

      const q = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery ||
        item.title?.toLowerCase().includes(q) ||
        item.organizer?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [workshops, activeTab, searchQuery]);

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    if (activeTab === 'workshops' || activeTab === 'keynotes') return [];
    return gallery.filter(item => {
      const q = searchQuery.toLowerCase();
      return !searchQuery ||
        item.title?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q);
    });
  }, [gallery, activeTab, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Academic Outreach & Visual Archives"
        title="Events, Keynotes & Moments"
        description="Chronicle of keynote addresses, AICTE/UGC sponsored FDPs, international symposiums, expert seminars, and commemorative gallery moments."
        icon={Presentation}
        breadcrumbs={[{ name: 'Events' }]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10">
        
        {/* macOS Glossy Filter Dock */}
        <div className="mac-card p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200/50 dark:bg-white/5 w-full md:w-auto overflow-x-auto">
            {[
              { id: 'all', label: 'All Events & Photos', icon: Sparkles },
              { id: 'keynotes', label: 'Keynotes & Talks', icon: Mic },
              { id: 'workshops', label: 'FDPs & Workshops', icon: Presentation },
              { id: 'gallery', label: 'Photo Moments', icon: Camera }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-white dark:bg-navy-800 text-academic-600 dark:text-academic-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search talks, venues, topics..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
            />
          </div>
        </div>

        {/* Academic Events / Keynotes Section */}
        {activeTab !== 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-academic-500 animate-pulse" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeTab === 'keynotes' ? 'Keynotes & Expert Lectures' : activeTab === 'workshops' ? 'FDPs & Professional Workshops' : 'Invited Keynotes, FDPs & Workshops'}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {filteredEvents.length} Recorded Sessions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((evt, idx) => (
                <div 
                  key={evt.id || evt._id || idx}
                  className="mac-card p-6 flex flex-col justify-between space-y-4 hover:border-academic-500/50 transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    {/* Badge Row */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                        {evt.type || 'FDP / Workshop'}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.year || evt.dates}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-academic-600 dark:group-hover:text-academic-400 transition-colors leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/50 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-academic-700 dark:text-academic-300">
                      Org: {evt.organizer}
                    </span>
                    {evt.location && (
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{evt.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Moments Gallery Section */}
        {activeTab !== 'workshops' && activeTab !== 'keynotes' && filteredGallery.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Event Moments & Visual Archives
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {filteredGallery.length} Photographs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item, idx) => (
                <div
                  key={item.id || item._id || idx}
                  onClick={() => setSelectedImage(item)}
                  className="mac-card overflow-hidden group cursor-pointer hover:border-academic-500/50 transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-navy-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-semibold flex items-center gap-1">
                        <span>Expand View</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-academic-600 dark:text-academic-400 bg-academic-50 dark:bg-academic-950 px-2 py-0.5 rounded">
                        {item.category || 'Event'}
                      </span>
                      {item.date && (
                        <span className="text-[11px] text-slate-500">{item.date}</span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Lightbox Modal for Photo Moments */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-3xl w-full mac-card overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="mac-traffic-lights">
                <span className="mac-dot red" onClick={() => setSelectedImage(null)} />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {selectedImage.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer profile={profile} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export default EventsPage;
