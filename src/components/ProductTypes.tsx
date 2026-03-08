import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const TYPES = [
  {
    title: "Signature Jars",
    desc: "Our timeless hand-poured glass vessels.",
    image: "https://images.unsplash.com/photo-1510028735437-476418ee352d",
    tag: "The Classic"
  },
  {
    title: "Sculptural Wax",
    desc: "Architectural objects designed to transform.",
    image: "https://images.unsplash.com/photo-1650376945963-b2bbe2ee442a",
    tag: "Modern Art"
  },
  {
    title: "Artisan Pours",
    desc: "Small-batch ceramics with unique glazes.",
    image: "https://images.unsplash.com/photo-1765283271840-8d2c94e6e7cb",
    tag: "One of One"
  },
  {
    title: "Apothecary Mist",
    desc: "Atmospheric room and linen fragrances.",
    image: "https://images.unsplash.com/photo-1594813593211-97d7e818a644",
    tag: "Scent Ritual"
  }
];

export const ProductTypes: React.FC = () => {
  return (
    <section className="py-40 bg-[#fff5f0] dark:bg-neutral-950 transition-colors duration-700">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-32 space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-orange-700 dark:text-orange-400 uppercase tracking-[0.6em] text-[10px] font-bold block"
          >
            Our Taxonomy
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-stone-900 dark:text-white leading-tight"
          >
            Vessels of <span className="italic text-stone-400 font-light">Light</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {TYPES.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-square mb-10 flex items-center justify-center p-8 bg-white/40 dark:bg-neutral-900/40 rounded-full border border-orange-100 dark:border-white/5 overflow-hidden">
                {/* Background removed look achieved through studio photography on clean backgrounds */}
                <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
                  <ImageWithFallback 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                
                {/* Floating Circle Detail */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-dashed border-orange-200 dark:border-orange-500/20 rounded-full animate-[spin_20s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="text-center space-y-4 px-4">
                <span className="text-[9px] uppercase tracking-[0.4em] text-orange-700 dark:text-orange-400 font-bold">{type.tag}</span>
                <h3 className="text-2xl font-serif text-stone-900 dark:text-white group-hover:text-orange-700 transition-colors duration-500">
                  {type.title}
                </h3>
                <p className="text-stone-500 dark:text-neutral-400 text-sm font-light leading-relaxed italic">
                  {type.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
