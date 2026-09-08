import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

const PageHeader = ({ 
  badge, 
  title, 
  description, 
  icon: Icon,
  breadcrumbs = [] 
}) => {
  return (
    <div className="relative pt-28 pb-12 overflow-hidden border-b border-slate-200/50 dark:border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-44 bg-gradient-to-r from-academic-500/10 via-sky-500/10 to-amber-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Breadcrumb Navigation Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mac-glass text-xs font-medium text-slate-600 dark:text-slate-300 mb-5 shadow-xs">
          <Link 
            to="/" 
            className="flex items-center gap-1 hover:text-academic-600 dark:hover:text-academic-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 opacity-40" />
              {crumb.href ? (
                <Link 
                  to={crumb.href} 
                  className="hover:text-academic-600 dark:hover:text-academic-400 transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-academic-600 dark:text-academic-400 font-semibold">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Badge & macOS Window Control */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-500/10 dark:bg-academic-400/10 border border-academic-500/20 text-academic-700 dark:text-academic-300 text-xs font-bold uppercase tracking-wider">
              {Icon ? <Icon className="w-3.5 h-3.5 text-academic-600 dark:text-academic-400" /> : <Sparkles className="w-3.5 h-3.5 text-academic-500" />}
              <span>{badge}</span>
            </div>
          )}
        </div>

        {/* Page Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-3">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
