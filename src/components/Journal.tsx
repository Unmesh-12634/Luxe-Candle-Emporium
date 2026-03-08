import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const JOURNAL_ENTRIES = [
  { 
    date: "Feb 09, 2026", 
    title: "The Alchemy of Winter Bloom", 
    image: "https://images.unsplash.com/photo-1549298222-1c31e8915347", 
    category: "Process", 
    desc: "Exploring the scent profile of cold-climate botanicals and their resonance in urban spaces.",
    readTime: "6 min"
  },
  { 
    date: "Jan 15, 2026", 
    title: "Sustainably Repurposing Ceramics", 
    image: "https://images.unsplash.com/photo-1580680849668-45d32df32e67", 
    category: "Lifestyle", 
    desc: "Giving your vessel a second life as a studio companion or a vessel for new growth.",
    readTime: "4 min"
  },
  { 
    date: "Dec 20, 2025", 
    title: "Midnight Jasmine: A Terroir Study", 
    image: "https://images.unsplash.com/photo-1724570568441-9755d8e8b6e2", 
    category: "Notes", 
    desc: "Why our jasmine blooms differently at the witching hour and the chemistry of nocturnal scents.",
    readTime: "8 min"
  }
];

export const Journal = ({ theme }: { theme: 'dark' | 'light' }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className={`min-h-screen pt-40 pb-40 relative transition-colors duration-1000 ${isDark ? 'bg-[#0F0F0F] text-[#F5E6C8]' : 'bg-[#FFF5F0] text-[#2D2D2D]'}`}
    >
      {/* Premium Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-100 mix-blend-overlay z-50 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <header className="mb-40 space-y-12 max-w-5xl">
           <div className="flex items-center gap-6">
              <span className="w-12 h-[1px] bg-amber-500" />
              <span className={`text-[10px] uppercase tracking-[0.8em] font-bold ${isDark ? 'text-amber-500' : 'text-stone-500'}`}>The Artisan Journal</span>
           </div>
           <h2 className="text-6xl md:text-[9rem] font-serif italic tracking-tighter leading-none">
             Atmospheric <br/> <span className="pl-0 md:pl-40">Research</span>
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10">
              <p className="text-xl md:text-2xl font-light opacity-60 leading-relaxed italic">
                A continuous exploration into scent, sculpture, and the profound feeling of home. We document the slow science behind every flame.
              </p>
              <div className="flex flex-col justify-end items-start md:items-end">
                 <div className="flex gap-4 opacity-40">
                    <div className="flex items-center gap-2">
                       <BookOpen className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">12 Archives</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-current mt-2" />
                    <div className="flex items-center gap-2">
                       <Tag className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">Process & Notes</span>
                    </div>
                 </div>
              </div>
           </div>
        </header>

        <div className="space-y-40">
           {JOURNAL_ENTRIES.map((entry, i) => (
             <motion.article 
                key={entry.title} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group`}
             >
                <div className={`lg:col-span-7 relative ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                   <div className="aspect-[16/9] md:aspect-[21/9] rounded-[4rem] overflow-hidden relative shadow-2xl">
                      <ImageWithFallback 
                        src={entry.image} 
                        alt={entry.title} 
                        className="w-full h-full object-cover grayscale transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-1000" />
                   </div>
                   
                   {/* Floating Label */}
                   <div className={`absolute -bottom-10 ${i % 2 === 0 ? '-right-10' : '-left-10'} hidden md:block z-20`}>
                      <div className={`p-10 rounded-[3rem] backdrop-blur-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} space-y-2`}>
                         <p className="text-[8px] uppercase tracking-[0.5em] font-bold opacity-40">Journal Entry</p>
                         <p className="text-xl font-serif italic">{entry.date}</p>
                      </div>
                   </div>
                </div>

                <div className={`lg:col-span-5 space-y-8 ${i % 2 === 0 ? 'lg:order-2 lg:pl-20' : 'lg:order-1 lg:pr-20'}`}>
                   <div className="flex items-center gap-4 opacity-40 text-[9px] uppercase tracking-[0.5em] font-bold">
                      <span className="text-amber-500">[{entry.category}]</span>
                      <div className="flex items-center gap-2">
                         <Clock className="w-3 h-3" />
                         <span>{entry.readTime} Read</span>
                      </div>
                   </div>
                   
                   <h3 className="text-4xl md:text-6xl font-serif italic leading-[1.1] tracking-tight group-hover:text-amber-500 transition-colors duration-500">
                      {entry.title}
                   </h3>
                   
                   <p className="text-lg font-light opacity-50 leading-relaxed italic">
                      {entry.desc}
                   </p>
                   
                   <button className="flex items-center gap-6 group/btn">
                      <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-40 group-hover/btn:opacity-100 transition-opacity">
                        Explore Full Archive
                      </span>
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 group-hover/btn:bg-amber-600 group-hover/btn:border-amber-600 group-hover/btn:translate-x-4 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                         <ArrowRight className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} />
                      </div>
                   </button>
                </div>
             </motion.article>
           ))}
        </div>

        {/* Newsletter Section with "Shade Texture" */}
        <section className="mt-60 relative">
           <div className={`rounded-[5rem] p-12 md:p-32 overflow-hidden relative shadow-2xl ${isDark ? 'bg-[#151515]' : 'bg-white'}`}>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://images.unsplash.com/photo-1636820573509-c3a4bc2338be')] bg-cover grayscale" />
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-12">
                 <span className="text-[10px] uppercase tracking-[0.8em] font-bold opacity-30">Stay in the light</span>
                 <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter">Receive our <br/> monthly studies</h2>
                 <p className="text-lg font-light opacity-50 italic">New fragrance research, studio updates, and exclusive releases delivered to your sanctuary.</p>
                 
                 <div className="flex flex-col md:flex-row gap-4 pt-8">
                    <input 
                       type="email" 
                       placeholder="SANCTUARY@EMAIL.COM" 
                       className={`flex-1 px-10 py-6 rounded-full bg-transparent border text-[10px] uppercase tracking-widest outline-none focus:border-amber-500 transition-colors ${isDark ? 'border-white/10' : 'border-black/10'}`}
                    />
                    <button className={`px-12 py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] transition-all active:scale-95 ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500 shadow-xl shadow-amber-900/20' : 'bg-stone-900 text-white hover:bg-black'}`}>
                       Join Archives
                    </button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </motion.div>
  );
};
