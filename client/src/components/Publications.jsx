import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  FileText, 
  Quote, 
  Calendar, 
  Check, 
  Copy, 
  Sparkles, 
  Filter 
} from 'lucide-react';

const Publications = ({ publications = [] }) => {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const publicationTypes = ['All', 'Journal', 'Conference', 'Book Chapter', 'Patent'];

  // Extract unique years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publications.map(p => p.year))).filter(Boolean);
    return ['All', ...years.sort((a, b) => b - a)];
  }, [publications]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return publications.filter(pub => {
      const matchesType = selectedType === 'All' || pub.type?.toLowerCase() === selectedType.toLowerCase();
      const matchesYear = selectedYear === 'All' || String(pub.year) === String(selectedYear);
      const query = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        pub.title?.toLowerCase().includes(query) ||
        pub.authors?.toLowerCase().includes(query) ||
        pub.journal?.toLowerCase().includes(query) ||
        pub.abstract?.toLowerCase().includes(query);
      return matchesType && matchesYear && matchesSearch;
    });
  }, [publications, selectedType, selectedYear, searchQuery]);

  const handleCopyCitation = (pub) => {
    const citation = `${pub.authors} (${pub.year}). "${pub.title}". ${pub.journal}${pub.doi ? `, DOI: ${pub.doi}` : ''}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id || pub._id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="publications" className="py-24 relative bg-slate-50/50 dark:bg-navy-950/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Scholarly Output</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Research Publications & Papers
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            High-impact peer-reviewed journal papers, international conference proceedings, and book chapters.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-card rounded-2xl p-5 mb-10 shadow-sm border border-slate-200/80 dark:border-slate-800/80 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, journal..."
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
              />
            </div>

            {/* Type Tabs */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
              {publicationTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-academic-600 text-white shadow-sm shadow-academic-600/25'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Year Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-academic-500"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <span>Showing <strong>{filteredPublications.length}</strong> of {publications.length} publications</span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-academic-600 dark:text-academic-400 hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Publications List */}
        <div className="space-y-5">
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16 glass-card rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                No publications match your filter or search criteria.
              </p>
              <button
                onClick={() => { setSelectedType('All'); setSelectedYear('All'); setSearchQuery(''); }}
                className="mt-3 text-xs font-semibold text-academic-600 dark:text-academic-400 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            filteredPublications.map((pub, idx) => {
              const pubId = pub.id || pub._id || `pub-${idx}`;
              const isCopied = copiedId === pubId;

              return (
                <div
                  key={pubId}
                  className="glass-card rounded-2xl p-6 relative border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-200 shadow-sm hover:shadow-md space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    
                    {/* Badge & Year */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        pub.type === 'Journal' ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300' :
                        pub.type === 'Conference' ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300' :
                        pub.type === 'Patent' ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300' :
                        'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300'
                      }`}>
                        {pub.type || 'Journal'}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{pub.year}</span>
                      </span>

                      {pub.citations > 0 && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {pub.citations} Citations
                        </span>
                      )}
                    </div>

                    {/* Action Tools (Copy Citation, PDF, DOI) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyCitation(pub)}
                        title="Copy APA/BibTeX Citation"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-academic-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Quote className="w-4 h-4" />}
                      </button>

                      {pub.pdfUrl && (
                        <a
                          href={pub.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-academic-50 dark:bg-academic-950 text-academic-700 dark:text-academic-300 hover:bg-academic-100 dark:hover:bg-academic-900 border border-academic-200 dark:border-academic-800 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </a>
                      )}

                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi.replace(/^https?:\/\/doi\.org\//, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          <span>DOI</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {pub.title}
                  </h3>

                  {/* Authors & Journal */}
                  <div className="text-xs sm:text-sm space-y-1">
                    <p className="text-slate-600 dark:text-slate-300 font-medium">
                      <strong className="text-slate-800 dark:text-slate-100 font-semibold">Authors:</strong> {pub.authors}
                    </p>
                    <p className="text-academic-700 dark:text-academic-300 font-medium">
                      <em>{pub.journal}</em>
                      {pub.volume && ` • Vol. ${pub.volume}`}
                      {pub.issue && `(${pub.issue})`}
                      {pub.pages && ` • pp. ${pub.pages}`}
                    </p>
                  </div>

                  {/* Abstract */}
                  {pub.abstract && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 hover:line-clamp-none transition-all">
                      {pub.abstract}
                    </p>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
};

export default Publications;
