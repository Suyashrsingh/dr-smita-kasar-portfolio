import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import ResumeModal from '../components/ResumeModal';
import Contact from '../components/Contact';
import { Mail, Phone, MapPin, Clock, Building2, Send, CheckCircle2 } from 'lucide-react';
import { profileService } from '../services/api';

const ContactPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    profileService.getProfile()
      .then(res => {
        if (res.data?.data?.profile) {
          setProfile(res.data.data.profile);
        }
      })
      .catch(err => console.error('Failed to load profile:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col ambient-mesh transition-colors duration-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <PageHeader 
        badge="Direct Academic & Collaboration Inquiries"
        title="Get In Touch with Dr. Smita Kasar"
        description="Connect for research collaborations, doctoral supervision, keynote speaking engagements, and student mentorship."
        icon={Mail}
        breadcrumbs={[{ name: 'Contact' }]}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Office Hours & Quick Guidelines Bar */}
        <section className="mac-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-slate-200/50 dark:divide-white/5">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-academic-50 dark:bg-academic-950 text-academic-600 dark:text-academic-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Office Visiting Hours</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Mon - Fri: 2:00 PM - 5:00 PM (IST)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-academic-50 dark:bg-academic-950 text-academic-600 dark:text-academic-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Department Chamber</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">HOD Cabin, CSE Dept, MIT Chhatrapati Sambhajinagar</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-academic-50 dark:bg-academic-950 text-academic-600 dark:text-academic-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Institutional & Direct Email</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">smitakasar@gmail.com • smita.kasar@mit.asia</p>
                </div>
              </div>
            </div>
        </section>

        {/* Full Contact Form & Info Component */}
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export default ContactPage;
