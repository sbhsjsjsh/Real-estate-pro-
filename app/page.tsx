'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {BookOpen, CheckCircle2, ArrowRight, Phone, User, Building2, Download} from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: 'Individual Agent',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const businessTypes = [
    'Individual Agent',
    'Real Estate Agency',
    'Property Developer',
    'Investor',
    'Other',
  ];

  return (
    <main className="min-h-screen bg-white text-[#004d40]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-[#004d40] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
          >
            <span className="inline-block py-1 px-3 mb-4 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">
              Free Download
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Scale Your Real Estate <br className="hidden md:block" /> Business
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Get the ultimate growth ebook for Realtors. Learn how to build trust, generate premium leads, and showcase properties professionally.
            </p>
          </motion.div>

          <motion.div
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: 0.3, duration: 0.6}}
            className="flex flex-col items-center"
          >
            <div className="relative w-64 h-80 bg-white rounded-lg shadow-2xl overflow-hidden group mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#004d40] to-[#00695c] flex flex-col items-center justify-center p-6 text-center">
                <BookOpen size={48} className="text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">REAL ESTATE GROWTH GUIDE</h3>
                <div className="w-12 h-1 bg-white mb-4"></div>
                <p className="text-xs text-white/70">Master Digital Presence & Lead Generation</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white text-[#004d40] font-bold text-sm">
                FREE EBOOK
              </div>
            </div>

            <button 
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-[#004d40] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2"
            >
              Get Free Ebook Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          {!isSuccess ? (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              className="bg-white rounded-2xl p-8 border border-[#004d40]/10 shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Where should we send your ebook?</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-70">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004d40]/40" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-70">WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004d40]/40" size={18} />
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      placeholder="Enter 10-digit number"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 10) {
                          setFormData({...formData, phone: value});
                        }
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">Example: 9876543210</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 opacity-70">Business Type</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[#004d40]/40" size={18} />
                    <select
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] outline-none transition-all appearance-none"
                      value={formData.businessType}
                      onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#004d40] text-white font-bold text-lg hover:bg-[#00695c] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Get Free Ebook <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
              <p className="mt-4 text-center text-xs opacity-50">
                Join 500+ Realtors who scaled their business this year.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              className="text-center p-12 bg-[#004d40]/5 rounded-2xl border-2 border-dashed border-[#004d40]/20"
            >
              <div className="w-20 h-20 bg-[#004d40] rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-4">You're All Set!</h2>
              <p className="text-[#004d40]/70 mb-8">
                Thank you for your interest. You can now download your free ebook below.
              </p>
              <a
                href="/real-estate-growth-ebook.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#004d40] text-white rounded-xl font-bold hover:bg-[#00695c] transition-colors"
              >
                <Download size={24} /> Download Ebook PDF
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What's Inside the Guide?</h2>
            <p className="opacity-60">Everything you need to dominate the real estate market.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Build Trust',
                desc: 'Learn how to present your business professionally on Google.',
                icon: <CheckCircle2 className="text-[#004d40]" />,
              },
              {
                title: 'Get More Leads',
                desc: 'Strategies for WhatsApp, calls, and effective enquiry forms.',
                icon: <CheckCircle2 className="text-[#004d40]" />,
              },
              {
                title: 'Showcase Property',
                desc: 'The best ways to present photos, prices, and amenities.',
                icon: <CheckCircle2 className="text-[#004d40]" />,
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm opacity-70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100 text-center text-sm opacity-50">
        &copy; Real Estate Growth Academy. All rights reserved.
      </footer>
    </main>
  );
}
