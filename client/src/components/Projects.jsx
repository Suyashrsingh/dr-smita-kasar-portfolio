import React from 'react';
import { Layers, Calendar, DollarSign, Award, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const Projects = ({ projects = [] }) => {
  const defaultProjects = [
    {
      title: "AI-Driven Non-Invasive Diagnostic Tool for Pulmonary & Respiratory Diseases",
      role: "Principal Investigator (PI)",
      fundingAgency: "Savitribai Phule Pune University (SPPU) BCUD Research Scheme",
      amount: "INR 4,50,000",
      duration: "2022 - 2024",
      status: "Completed",
      domain: "Artificial Intelligence & Healthcare Telemetry",
      description: "Designed a portable edge-AI unit capturing acoustic respiratory signals to classify COPD, asthma, and pneumonia anomalies with high sensitivity."
    },
    {
      title: "Blockchain-Powered Decentralized Credential Verification System for Universities",
      role: "Principal Investigator (PI)",
      fundingAgency: "AICTE Research Promotion Scheme (RPS)",
      amount: "INR 8,20,000",
      duration: "2021 - 2023",
      status: "Completed",
      domain: "Blockchain, Cryptography & Smart Contracts",
      description: "Engineered an immutable, tamper-proof transcript and degree verification system deployed on a consortium blockchain network for higher educational institutions."
    },
    {
      title: "Smart Precision Agriculture IoT Gateway with Autonomous Solar Energy Harvesting",
      role: "Co-Principal Investigator (Co-PI)",
      fundingAgency: "AgriTech Industrial Innovation Grant",
      amount: "INR 3,00,000",
      duration: "2020 - 2022",
      status: "Completed",
      domain: "Internet of Things (IoT) & Embedded Machine Learning",
      description: "Deployed localized LoRaWAN soil moisture and microclimate sensor arrays with real-time irrigation automation models."
    },
    {
      title: "Adaptive Cyber Threat Intelligence & Zero-Day Exploit Detection Engine",
      role: "Principal Investigator (PI)",
      fundingAgency: "Institutional Innovation & Research Initiative",
      amount: "INR 2,50,000",
      duration: "2023 - Present",
      status: "Ongoing",
      domain: "Cyber Security & Cloud Defense",
      description: "Developing self-learning graph neural network models to correlate multi-source system log telemetry for preemptive intrusion prevention."
    }
  ];

  const items = Array.isArray(projects) ? projects : defaultProjects;

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Funded Research</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Research Grants & Funded Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Sponsored research initiatives funded by government agencies, AICTE, university schemes, and industrial partners.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((prj, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 relative border border-slate-200/80 dark:border-slate-800/80 hover:border-academic-500/60 dark:hover:border-academic-500/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Status & Role Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-academic-100 dark:bg-academic-950 text-academic-700 dark:text-academic-300">
                    {prj.role}
                  </span>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    prj.status === 'Ongoing'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {prj.status === 'Ongoing' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    <span>{prj.status}</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-snug">
                  {prj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {prj.description}
                </p>
              </div>

              {/* Funding Agency, Grant Amount & Duration */}
              <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-slate-800/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Funding Agency:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{prj.fundingAgency}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Grant Sanctioned:</span>
                  <span className="font-bold text-academic-600 dark:text-academic-400 font-mono">{prj.amount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{prj.duration}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
