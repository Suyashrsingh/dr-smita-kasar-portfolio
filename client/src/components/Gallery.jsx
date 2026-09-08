import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, MapPin, Calendar, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const Gallery = ({ gallery = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Conferences', 'Workshops', 'Student Activities', 'Awards', 'Campus & Events'];

  const defaultGallery = [
    {
      title: "Felicitation Ceremony - Sir M. Visvesvaraya Outstanding Engineer Award 2023",
      category: "Awards",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      date: "2023-09-15",
      description: "Receiving the prestigious Sir M. Visvesvaraya Award from distinguished dignitaries and engineering council leaders.",
      location: "Pune Auditorium",
      featured: true
    },
    {
      title: "Keynote Address at International Conference on AI Innovations (ICAI)",
      category: "Conferences",
      imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      date: "2023-11-20",
      description: "Delivering the inaugural keynote lecture on 'Deep Learning Paradigms in Healthcare Diagnostics'.",
      location: "Grand Convention Hall, Pune",
      featured: true
    },
    {
      title: "Inauguration of Centre of Excellence in AI & Cloud Computing",
      category: "Campus & Events",
      imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      date: "2024-02-10",
      description: "Ribbon cutting and lab tour for the advanced state-of-the-art AI and Cloud research facility at CSE Dept.",
      location: "MIT Campus, Chhatrapati Sambhajinagar",
      featured: true
    },
    {
      title: "Mentoring Student Innovators at Smart India Hackathon (SIH)",
      category: "Student Activities",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
      date: "2023-08-25",
      description: "Brainstorming and architectural design session with hackathon finalists developing intelligent healthcare tools.",
      location: "Innovation Hub",
      featured: true
    },
    {
      title: "National Level Faculty Development Program on Generative AI",
      category: "Workshops",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      date: "2024-01-18",
      description: "Group photograph with resource persons, department faculty, and 180+ delegate professors from across India.",
      location: "Main Seminar Hall",
      featured: false
    },
    {
      title: "Graduation Day & Student Felicitation Ceremony",
      category: "Student Activities",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      date: "2023-06-12",
      description: "Celebrating the achievements and campus placements of graduating computer engineering scholars.",
      location: "College Amphitheatre",
      featured: false
    }
  ];

  const items = Array.isArray(gallery) ? gallery : defaultGallery;

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const nextLightbox = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="py-24 relative bg-slate-50/50 dark:bg-navy-950/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Academic Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Photo Gallery & Highlights
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Snapshots of conferences, technical workshops, award felicitations, and student hackathons.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-academic-600 text-white shadow-sm shadow-academic-600/25'
                  : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative rounded-2xl overflow-hidden glass-card border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-navy-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold">
                  {item.category}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-academic-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-bold text-sm line-clamp-2 mt-1">
                    {item.title}
                  </h4>
                  {item.location && (
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-academic-400" />
                      {item.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Title for quick scanning */}
              <div className="p-4 bg-white dark:bg-navy-900/90 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-academic-600 dark:group-hover:text-academic-400 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <span>{item.category}</span>
                  <span>{item.location || 'Pune'}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-navy-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl space-y-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image with Prev/Next Controls */}
            <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev Button */}
              <button
                onClick={prevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Info Footer */}
            <div className="p-6 bg-navy-950 text-white space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-academic-600 text-xs font-semibold">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredItems[lightboxIndex].date} {filteredItems[lightboxIndex].location && `• ${filteredItems[lightboxIndex].location}`}
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
