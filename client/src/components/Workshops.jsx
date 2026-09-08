import React, { useState } from 'react';
import { Presentation, Calendar, MapPin, ExternalLink, Image as ImageIcon, Sparkles, Filter, X } from 'lucide-react';

const Workshops = ({ workshops = [] }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedPoster, setSelectedPoster] = useState(null);

  const defaultWorkshops = [
    {
      title: "Session on 'AI: Impact on Manufacturing Industry'",
      role: "Resource Person / Keynote",
      type: "Keynote",
      date: "February 10, 2025",
      duration: "Invited Expert Session",
      institution: "Marathwada Auto Cluster (MAC), Chhatrapati Sambhajinagar",
      description: "Delivered keynote session to automotive manufacturing leaders and engineers on industrial machine learning pipelines, predictive equipment maintenance, and vision robotics.",
      posterUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      certificateUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Session on 'Backpropagation Learning Algorithm' (Pre-PhD Coursework)",
      role: "Resource Person",
      type: "Workshop",
      date: "April 20, 2024",
      duration: "Doctoral Masterclass",
      institution: "Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU)",
      description: "Conducted intensive technical training on mathematical derivations of gradient descent, loss landscapes, and backpropagation for registered doctoral scholars.",
      posterUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      certificateUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Two Sessions on 'Advanced Probability for Data Science'",
      role: "Resource Person",
      type: "FDP",
      date: "October 26, 2023",
      duration: "Refresher Course Masterclass",
      institution: "UGC - Malaviya Mission Teacher Training Centre, Dr. BAMU",
      description: "Delivered two masterclass sessions on Bayesian probability theory, Markov stochastic models, and statistical foundations of data science.",
      posterUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      certificateUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Five-Day FDP on 'Blockchain Technology & Industry 4.0'",
      role: "Resource Person",
      type: "FDP",
      date: "December 26-31, 2022",
      duration: "5-Day State FDP",
      institution: "Pimpri Chinchwad College of Engineering (PCCOE), Pune",
      description: "Delivered comprehensive modules on blockchain architecture, cryptographic hashing, distributed consensus mechanisms, and enterprise smart contract security.",
      posterUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
      certificateUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const items = Array.isArray(workshops) ? workshops : defaultWorkshops;
  const tabs = ['All', 'Organized', 'Keynote / Resource', 'Attended'];

  const filteredItems = items.filter(w => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Organized') return w.role?.toLowerCase().includes('organized') || w.role?.toLowerCase().includes('convener');
    if (activeTab === 'Keynote / Resource') return w.role?.toLowerCase().includes('keynote') || w.role?.toLowerCase().includes('resource') || w.role?.toLowerCase().includes('chair');
    if (activeTab === 'Attended') return w.role?.toLowerCase().includes('attended');
    return true;
  });

  return (
    <section id="workshops" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <Presentation className="w-3.5 h-3.5" />
            <span>Academic Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            FDPs, Workshops & Keynotes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            National and AICTE-sponsored faculty development initiatives, technical masterclasses, and keynote addresses.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-academic-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Workshops Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((wkp, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 relative border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                    {wkp.type || 'FDP'}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                    {wkp.duration}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {wkp.title}
                </h3>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-academic-600 dark:text-academic-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{wkp.date}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{wkp.institution}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                  {wkp.description}
                </p>

              </div>

              {/* Action Buttons: Poster & Role */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {wkp.role}
                </span>

                {wkp.posterUrl && (
                  <button
                    onClick={() => setSelectedPoster(wkp)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>View Event</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Poster Preview Modal */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-lg w-full bg-white dark:bg-navy-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {selectedPoster.title}
              </h3>
              <button
                onClick={() => setSelectedPoster(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video">
              <img
                src={selectedPoster.posterUrl}
                alt={selectedPoster.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p><strong>Host Institution:</strong> {selectedPoster.institution}</p>
              <p><strong>Date & Duration:</strong> {selectedPoster.date} ({selectedPoster.duration})</p>
              <p>{selectedPoster.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Workshops;
