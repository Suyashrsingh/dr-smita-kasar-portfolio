import React, { useState } from 'react';
import { 
  Bell, 
  FileText, 
  Download, 
  ExternalLink, 
  Calendar, 
  User, 
  Tag, 
  Sparkles, 
  Eye, 
  X, 
  Printer, 
  Search, 
  CheckCircle2,
  BookOpen,
  FileCheck,
  Presentation
} from 'lucide-react';

export const getDocumentInfo = (item) => {
  if (!item || !item.attachmentUrl) {
    return {
      hasAttachment: false,
      type: 'txt',
      ext: 'txt',
      label: 'Lecture Notes',
      buttonText: 'Download Notes (.txt)',
      badgeBg: 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30'
    };
  }

  const rawUrl = item.attachmentUrl || '';
  const rawName = item.attachmentName || '';
  const rawType = (item.attachmentType || '').toLowerCase().replace('.', '');
  
  // Detect extension
  let ext = '';
  const extMatch = (rawName || rawUrl).match(/\.([a-zA-Z0-9]+)(?:[?#]|$)/i);
  if (extMatch) {
    ext = extMatch[1].toLowerCase();
  } else if (rawType) {
    ext = rawType;
  }

  if (!ext) {
    const lower = `${rawUrl} ${rawName}`.toLowerCase();
    if (lower.includes('pdf')) ext = 'pdf';
    else if (lower.includes('ppt')) ext = 'pptx';
    else if (lower.includes('doc')) ext = 'docx';
    else if (lower.includes('txt')) ext = 'txt';
    else ext = 'pdf';
  }

  if (ext === 'ppt' || ext === 'pptx') {
    return {
      hasAttachment: true,
      type: 'pptx',
      ext: ext,
      label: 'PowerPoint PPTX',
      buttonText: `Download PPT (.${ext})`,
      badgeBg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
    };
  }
  if (ext === 'pdf') {
    return {
      hasAttachment: true,
      type: 'pdf',
      ext: 'pdf',
      label: 'PDF Document',
      buttonText: 'Download PDF (.pdf)',
      badgeBg: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30'
    };
  }
  if (ext === 'doc' || ext === 'docx') {
    return {
      hasAttachment: true,
      type: 'docx',
      ext: ext,
      label: 'Word Document',
      buttonText: `Download Word (.${ext})`,
      badgeBg: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
    };
  }
  if (ext === 'txt') {
    return {
      hasAttachment: true,
      type: 'txt',
      ext: 'txt',
      label: 'Text Notes',
      buttonText: 'Download Text (.txt)',
      badgeBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
    };
  }

  return {
    hasAttachment: true,
    type: ext,
    ext: ext,
    label: `${ext.toUpperCase()} File`,
    buttonText: `Download File (.${ext})`,
    badgeBg: 'bg-academic-500/15 text-academic-700 dark:text-academic-300 border-academic-500/30'
  };
};

const AnnouncementsSection = ({ articles = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const categories = ['All', 'Lecture Notes & Material', 'Academic Notice', 'Department Circular', 'Research Insight'];

  const filtered = articles.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category?.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      art.title?.toLowerCase().includes(q) || 
      art.content?.toLowerCase().includes(q) ||
      (art.tags && art.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  // Client-side download ensuring exact format (PDF, PPT, DOCX, TXT)
  const handleDownloadNotes = async (item) => {
    const info = getDocumentInfo(item);
    const safeTitle = (item.title || 'Course_Notes').replace(/[^a-zA-Z0-9_-]/g, '_');
    
    if (item.attachmentUrl) {
      let filename = item.attachmentName;
      if (!filename || !filename.includes('.')) {
        filename = `${safeTitle}.${info.ext}`;
      } else if (!filename.toLowerCase().endsWith(`.${info.ext}`)) {
        filename = `${filename}.${info.ext}`;
      }

      const fileUrl = item.attachmentUrl;

      // Direct download via binary blob to ensure OS preserves exact file extension and MIME type
      try {
        const fetchUrl = fileUrl.startsWith('http') || fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        return;
      } catch (err) {
        console.warn('Blob fetch download failed, fallback to direct anchor:', err);
        // Fallback for CORS restricted external links
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
    }

    // No uploaded file: generate formatted text (.txt) document
    const content = `=====================================================
DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
MAHARASHTRA INSTITUTE OF TECHNOLOGY (MIT)
Course Notes: ${item.title}
Faculty: ${item.author || 'Dr. Smita Lalit Kasar, Professor & Head, CSE'}
Category: ${item.category || 'Lecture Notes'}
Date: ${item.date || new Date().toISOString().split('T')[0]}
=====================================================

${item.content}

-----------------------------------------------------
Tags: ${(item.tags || []).join(', ')}
© Dr. Smita Lalit Kasar • MIT Chhatrapati Sambhajinagar
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeTitle}_Notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintModal = () => {
    window.print();
  };

  const activeDocInfo = activeArticle ? getDocumentInfo(activeArticle) : null;

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-16 mac-card rounded-3xl">
        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold">No lecture notes or announcements posted yet.</p>
      </div>
    );
  }

  return (
    <section id="announcements" className="py-6 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, topics, keywords..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-academic-600 text-white shadow-sm shadow-academic-600/25'
                    : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Articles & Notes Grid */}
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-3 border border-slate-200/80 dark:border-slate-800/80">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Notes or Circulars Available</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              There are currently no items under this category, or they have been cleared by the department.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item, idx) => {
              const docInfo = getDocumentInfo(item);
              return (
                <div
                  key={item.id || item._id || idx}
                  className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-200 shadow-sm flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                          {item.category || 'Lecture Notes'}
                        </span>
                        {docInfo.hasAttachment && (
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${docInfo.badgeBg}`}>
                            {docInfo.label}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug group-hover:text-academic-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                      {item.content}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-navy-900 text-slate-600 dark:text-slate-400 font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Download & Read */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveArticle(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-navy-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-academic-500" />
                      <span>Read Notes</span>
                    </button>

                    <button
                      onClick={() => handleDownloadNotes(item)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-academic-600 hover:bg-academic-700 shadow-md shadow-academic-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{docInfo.buttonText}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Reader Modal */}
      {activeArticle && activeDocInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[90vh] mac-card rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 mac-dock">
              <div className="flex items-center gap-3">
                <div className="mac-traffic-lights">
                  <span className="mac-dot red" onClick={() => setActiveArticle(null)} title="Close" />
                  <span className="mac-dot yellow" onClick={handlePrintModal} title="Print" />
                  <span className="mac-dot green" title="Study Notes" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {activeArticle.category || 'Lecture Notes'}
                  </span>
                  {activeDocInfo.hasAttachment && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${activeDocInfo.badgeBg}`}>
                      {activeDocInfo.label}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintModal}
                  title="Print / Save PDF"
                  className="p-2 rounded-xl text-slate-600 dark:text-slate-300 mac-btn-glass cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDownloadNotes(activeArticle)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-academic-600 hover:bg-academic-700 text-white shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{activeDocInfo.buttonText}</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 ml-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white/50 dark:bg-navy-950/50">
              <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                    {activeArticle.category}
                  </span>
                  {activeDocInfo.hasAttachment && (
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${activeDocInfo.badgeBg}`}>
                      {activeDocInfo.label}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                  <span>Author: <strong>{activeArticle.author || 'Dr. Smita Kasar'}</strong></span>
                  <span>•</span>
                  <span>Date: {activeArticle.date}</span>
                </div>
              </div>

              {/* Direct Attached Document Download Banner in Modal */}
              {activeDocInfo.hasAttachment && (
                <div className="p-4 rounded-2xl bg-academic-500/10 border border-academic-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 ${activeDocInfo.badgeBg}`}>
                      {activeDocInfo.ext.toUpperCase()}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {activeArticle.attachmentName || activeArticle.attachmentUrl.split('/').pop()}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Official downloadable course document ({activeDocInfo.label})
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadNotes(activeArticle)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-academic-600 hover:bg-academic-700 text-white shrink-0 cursor-pointer shadow-md shadow-academic-600/20 transition-transform hover:-translate-y-0.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{activeDocInfo.buttonText}</span>
                  </button>
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                {activeArticle.content}
              </div>

              {activeArticle.tags && activeArticle.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Tags:</span>
                  {activeArticle.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-lg text-xs bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnnouncementsSection;
