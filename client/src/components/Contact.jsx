import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Building2 } from 'lucide-react';
import { messageService } from '../services/api';

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in your name, email, and message.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await messageService.send(formData);
      if (res.data.success) {
        setStatus({ 
          type: 'success', 
          text: 'Thank you! Your message has been sent directly to Dr. Smita Kasar.' 
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', text: res.data.message || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ 
        type: 'error', 
        text: err.response?.data?.message || 'Error submitting form. Please try again or email directly.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      title: 'Institutional & Direct Email',
      value: profile?.contact?.email || 'smitakasar@gmail.com',
      href: `mailto:${profile?.contact?.email || 'smitakasar@gmail.com'}`,
      icon: <Mail className="w-5 h-5 text-academic-500" />,
      desc: 'smita.kasar@mit.asia • Official Correspondence'
    },
    {
      title: 'Direct Mobile & Office Phone',
      value: profile?.contact?.phone || '+91 9923432229',
      href: `tel:${profile?.contact?.phone || '+919923432229'}`,
      icon: <Phone className="w-5 h-5 text-emerald-500" />,
      desc: 'Landline: 0240 - 2375270 (Mon-Sat, 9AM-5PM)'
    },
    {
      title: 'Department Chamber Location',
      value: profile?.contact?.office || 'HOD Cabin, Dept. of CSE, Maharashtra Institute of Technology, Beed Bypass Road, Chhatrapati Sambhajinagar - 431010, Maharashtra, India',
      href: 'https://maps.google.com/?q=Maharashtra+Institute+of+Technology+Aurangabad',
      icon: <MapPin className="w-5 h-5 text-amber-500" />,
      desc: 'Chhatrapati Sambhajinagar (Aurangabad), Maharashtra'
    }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-academic-50 dark:bg-academic-950 border border-academic-200 dark:border-academic-800 text-academic-700 dark:text-academic-300 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with Dr. Kasar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Inquiries & Research Collaborations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Reach out for doctoral supervision inquiries, research collaborations, student mentorship, and keynote talks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Contact Info & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-slate-200/80 dark:border-slate-800/80">
              
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Prof. & Head of Department, Computer Science & Engineering
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-50/80 dark:bg-navy-900/80 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80 transition-all flex items-start gap-3.5 group"
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-navy-950 shadow-xs group-hover:scale-110 transition-transform shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5 break-all">
                        {item.value}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Institutional Affiliation Badge */}
              <div className="p-4 rounded-xl bg-academic-50 dark:bg-academic-950/60 border border-academic-200 dark:border-academic-800 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-academic-600 dark:text-academic-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    An Autonomous Institute • Affiliated to Dr. BAMU
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800/80 space-y-6">
              
              <div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Fill out the form below and Dr. Smita Kasar's office will get back to you promptly.
                </p>
              </div>

              {status && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs sm:text-sm font-medium ${
                  status.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                }`}>
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Ramesh Gupta"
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh.gupta@institute.edu"
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Subject / Topic of Inquiry
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Research Collaboration / Ph.D. Guidance / Keynote Invitation"
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Message Body <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, project proposal, or query here..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-academic-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-academic-600 hover:bg-academic-700 text-white shadow-lg shadow-academic-600/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Dr. Smita Kasar</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
