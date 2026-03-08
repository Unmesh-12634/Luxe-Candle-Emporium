import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Instagram, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#fff5f0] dark:bg-neutral-950 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative Light Leak */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-amber-600 uppercase tracking-[0.5em] text-[10px] block mb-8"
            >
              Collaborations
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-neutral-950 dark:text-white leading-tight"
            >
              Inquire <br />
              <span className="italic font-light text-neutral-400 dark:text-neutral-500">The Atelier</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600">Direct Contact</p>
                <div className="space-y-2">
                  <a href="mailto:studio@lumina.co" className="text-xl text-neutral-800 dark:text-neutral-200 hover:text-amber-600 transition-colors flex items-center gap-3">
                    studio@lumina.co <ArrowRight className="w-4 h-4 opacity-30" />
                  </a>
                  <p className="text-neutral-500 font-light">+1 212 940 3840</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600">The Studio</p>
                <p className="text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
                  42 Dumbo Arts Building <br />
                  Brooklyn, New York 11201
                </p>
              </div>

              <div className="flex gap-6">
                <a href="#" className="p-4 rounded-full border border-neutral-100 dark:border-white/5 hover:border-amber-600 transition-all text-neutral-400 dark:text-neutral-500 hover:text-amber-600">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-4 rounded-full border border-neutral-100 dark:border-white/5 hover:border-amber-600 transition-all text-neutral-400 dark:text-neutral-500 hover:text-amber-600">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Simple Form */}
            <div className="lg:col-span-3">
              <form className="space-y-10" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2 border-b border-neutral-200 dark:border-white/10 focus-within:border-amber-600 transition-colors">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-transparent py-4 text-neutral-900 dark:text-white focus:outline-none font-light" 
                    />
                  </div>
                  <div className="space-y-2 border-b border-neutral-200 dark:border-white/10 focus-within:border-amber-600 transition-colors">
                    <label className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-transparent py-4 text-neutral-900 dark:text-white focus:outline-none font-light" 
                    />
                  </div>
                </div>
                <div className="space-y-2 border-b border-neutral-200 dark:border-white/10 focus-within:border-amber-600 transition-colors">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">Your Inquiry</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-transparent py-4 text-neutral-900 dark:text-white focus:outline-none font-light resize-none" 
                  />
                </div>
                <motion.button 
                  whileHover={{ gap: '2rem' }}
                  className="flex items-center gap-4 text-neutral-900 dark:text-white uppercase tracking-[0.4em] text-[10px] font-bold group"
                >
                  Submit Request <div className="w-12 h-px bg-amber-600 transition-all group-hover:w-24" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
