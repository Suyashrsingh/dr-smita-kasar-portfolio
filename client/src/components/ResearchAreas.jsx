import React from 'react';
import { 
  Brain, 
  HeartPulse, 
  Link2, 
  ShieldCheck, 
  Cloud, 
  Sparkles, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

const ResearchAreas = ({ researchAreas = [] }) => {
  const defaultAreas = [
    {
      title: "Artificial Intelligence & Deep Learning",
      description: "Neural network architectures, computer vision, natural language processing, and multimodal foundation models.",
      iconName: "Brain",
      tags: ["CNNs", "Transformers", "Vision Models", "Generative AI"],
      projectsCount: 6,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Machine Learning in Healthcare",
      description: "Automated medical imaging diagnostics, disease risk classification, and biomedical sensor telemetry.",
      iconName: "HeartPulse",
      tags: ["Medical Imaging", "Retinopathy Detection", "Tumor Segmentation", "Bioinformatics"],
      projectsCount: 4,
      gradient: "from-rose-600 to-amber-600"
    },
    {
      title: "Blockchain & Decentralized Systems",
      description: "Smart contract security, consortium consensus algorithms, decentralized identity, and Zero-Knowledge proofs.",
      iconName: "Link2",
      tags: ["Smart Contracts", "DeFi Protocols", "EHR Privacy", "Hyperledger"],
      projectsCount: 3,
      gradient: "from-purple-600 to-indigo-600"
    },
    {
      title: "Cyber Security & Cryptography",
      description: "Network anomaly detection, cloud multi-tenancy security, zero-trust architectures, and DDoS mitigation.",
      iconName: "ShieldCheck",
      tags: ["Zero Trust", "Cloud Security", "DDoS Mitigation", "Penetration Testing"],
      projectsCount: 5,
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      title: "Cloud & Edge Computing",
      description: "Serverless distributed infrastructure, container orchestration, microservices, and IoT edge analytics.",
      iconName: "Cloud",
      tags: ["Kubernetes", "Edge AI", "Distributed Systems", "Serverless"],
      projectsCount: 4,
      gradient: "from-sky-600 to-blue-700"
    }
  ];

  const getIcon = (name) => {
    switch (name) {
      case 'Brain': return <Brain className="w-6 h-6 text-white" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-white" />;
      case 'Link2': return <Link2 className="w-6 h-6 text-white" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-white" />;
      default: return <Brain className="w-6 h-6 text-white" />;
    }
  };

  const areas = Array.isArray(researchAreas) ? researchAreas : defaultAreas;

  return (
    <section id="research" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Research Domains</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Research Areas & Specializations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Pioneering research tackling high-impact real-world challenges across modern computer science disciplines.
          </p>
        </div>

        {/* Areas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 relative border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${area.gradient || 'from-academic-600 to-academic-400'} flex items-center justify-center shadow-md shadow-academic-500/20 group-hover:scale-110 transition-transform`}>
                    {getIcon(area.icon || area.iconName)}
                  </div>
                  
                  {area.projectsCount && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {area.projectsCount} Projects
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2.5 group-hover:text-academic-600 dark:group-hover:text-academic-400 transition-colors">
                  {area.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                  {area.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex flex-wrap gap-1.5">
                  {area.tags && area.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResearchAreas;
