import React, { useState } from 'react';
import { Award, Trophy, Medal, Star, FileCheck, Sparkles, ExternalLink, X, CheckCircle2 } from 'lucide-react';

const Awards = ({ awards = [] }) => {
  const [selectedAward, setSelectedAward] = useState(null);

  const defaultAwards = [
    {
      title: "Sir M. Visvesvaraya Outstanding Engineer Award 2023",
      issuer: "State Level Apex Body & Institution of Engineers (India)",
      year: "2023",
      category: "Prestigious National / State Recognition",
      description: "Conferred with the Sir M. Visvesvaraya Award for outstanding contributions to engineering education, technological innovation in AI/ML, and distinguished academic leadership.",
      icon: "Trophy",
      certificateUrl: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      title: "Best Researcher & Academic Excellence Award",
      issuer: "Maharashtra Institute of Technology (MIT), Aurangabad",
      year: "2022",
      category: "Institutional Honor",
      description: "Awarded for publishing high-impact SCI/Scopus journal papers and securing funded research grants from university and government bodies.",
      icon: "Award",
      certificateUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      title: "Eminent Academician & Computer Scientist Award",
      issuer: "Computer Society of India (CSI), Pune Chapter",
      year: "2021",
      category: "Professional Society Recognition",
      description: "Honored for dedicated service towards student mentorship, technical skill incubation, and fostering industry-academia collaborative projects.",
      icon: "Medal",
      certificateUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      title: "Outstanding Mentor Award - Smart India Hackathon",
      issuer: "Ministry of Education Innovation Cell (MIC), Govt. of India",
      year: "2020",
      category: "National Competition",
      description: "Guided student teams to win 1st Prize in SIH National Finals for an automated AI solution addressing healthcare resource allocation.",
      icon: "Star",
      certificateUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80",
      featured: false
    },
    {
      title: "Best Research Paper Award",
      issuer: "International Conference on Smart Computing & Technological Advances (ICSTA)",
      year: "2019",
      category: "Conference Recognition",
      description: "Awarded Best Technical Paper in the Cyber Security and Cryptography track among 120+ international submissions.",
      icon: "FileCheck",
      certificateUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      featured: false
    }
  ];

  const items = awards && awards.length > 0 ? awards : defaultAwards;
  const featuredAward = items.find(a => a.featured && a.title.includes('Visvesvaraya')) || items[0];
  const otherAwards = items.filter(a => a !== featuredAward);

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-6 h-6 text-amber-500" />;
      case 'Medal': return <Medal className="w-6 h-6 text-amber-500" />;
      case 'Star': return <Star className="w-6 h-6 text-amber-500" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-amber-500" />;
      default: return <Award className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <section id="awards" className="py-24 relative bg-slate-50/50 dark:bg-navy-950/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Awards & Distinctions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            National, state, and professional society awards acknowledging outstanding leadership and academic innovation.
          </p>
        </div>

        {/* Featured Award: Sir M. Visvesvaraya Award Spotlight */}
        {featuredAward && (
          <div className="mb-12 relative overflow-hidden rounded-3xl border border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/80 via-white to-amber-100/40 dark:from-navy-900 dark:via-navy-950 dark:to-amber-950/30 p-8 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>State Level Apex Recognition • {featuredAward.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {featuredAward.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {featuredAward.description}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Conferred by {featuredAward.issuer}</span>
                  </div>
                </div>
              </div>

              {/* Spotlight Trophy Card / Certificate Preview */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-xs rounded-2xl overflow-hidden glass-card p-4 border border-amber-300/60 dark:border-amber-700/60 shadow-lg text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-inner">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    Sir M. Visvesvaraya Award 2023
                  </div>
                  <p className="text-xs text-slate-500">
                    Excellence in Engineering Education & Research
                  </p>
                  {featuredAward.certificateUrl && (
                    <button
                      onClick={() => setSelectedAward(featuredAward)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Felicitation Details</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Other Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherAwards.map((awd, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 relative border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400/60 dark:hover:border-amber-400/60 transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
                {renderIcon(awd.icon)}
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                    {awd.year}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {awd.category}
                  </span>
                </div>

                <h4 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {awd.title}
                </h4>

                <p className="text-xs text-academic-700 dark:text-academic-300 font-semibold">
                  {awd.issuer}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {awd.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Award Modal */}
      {selectedAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-lg w-full bg-white dark:bg-navy-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {selectedAward.title}
              </h3>
              <button
                onClick={() => setSelectedAward(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedAward.certificateUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video">
                <img
                  src={selectedAward.certificateUrl}
                  alt={selectedAward.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <p><strong>Conferring Body:</strong> {selectedAward.issuer}</p>
              <p><strong>Year Conferred:</strong> {selectedAward.year}</p>
              <p>{selectedAward.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Awards;
