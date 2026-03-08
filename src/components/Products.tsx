import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import coupleCandle from 'figma:asset/8ad527b1983978884cb84c1d4b45c3b545f0221b.png';

const PRODUCTS = [
  { 
    id: 1, 
    name: "Couple Candle", 
    price: "199", 
    currency: "₹",
    type: "Artisan Sculpture", 
    image: coupleCandle,
    desc: "A beautifully sculpted couple candle, symbolizing love and togetherness." 
  },
  { 
    id: 2, 
    name: "Moonlit Jasmine", 
    price: "32.00", 
    type: "Artisan Pour", 
    image: "https://images.unsplash.com/photo-1658316342181-1b90e17734ce",
    desc: "Indulgent floral notes balanced with rare vanilla beans." 
  },
];

export const Products: React.FC<{ onSeeMore: () => void }> = ({ onSeeMore }) => {
  return (
    <section id="collection" className="py-40 bg-[#fff5f0] dark:bg-neutral-950 transition-colors duration-700">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-orange-700 dark:text-orange-400 uppercase tracking-[0.6em] text-[10px] block mb-8 font-bold"
            >
              Curation No. 04
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-serif text-stone-900 dark:text-white leading-[0.9] tracking-tighter"
            >
              Signature <br />
              <span className="italic text-stone-400 dark:text-neutral-500 font-light">Atmospheres</span>
            </motion.h2>
          </div>
          <motion.button 
            onClick={onSeeMore}
            whileHover={{ x: 15 }}
            className="flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] font-bold text-stone-900 dark:text-white group border-b-2 border-orange-100 dark:border-white/5 pb-4 transition-all hover:border-orange-700 dark:hover:border-orange-400"
          >
            The Full Inventory <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-40">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="group cursor-pointer"
              onClick={onSeeMore}
            >
              <div className="relative aspect-[16/11] rounded-[3rem] overflow-hidden bg-white dark:bg-neutral-900 mb-12 shadow-2xl group-hover:shadow-orange-900/10 transition-all duration-1000">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-[2.5s] group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-stone-900/5 dark:bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center backdrop-blur-[4px]"
                >
                  <div className="bg-white/90 dark:bg-neutral-900/90 text-stone-900 dark:text-white px-12 py-5 rounded-full font-bold text-[11px] uppercase tracking-[0.4em] transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 shadow-2xl border border-white dark:border-white/10">
                    Discover Scent
                  </div>
                </motion.div>
                
                <div className="absolute top-10 left-10">
                   <div className="bg-white/40 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold text-stone-900">
                      Limited Batch
                   </div>
                </div>
              </div>

              <div className="flex justify-between items-start px-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-orange-700 dark:text-orange-400 font-bold">{product.type}</span>
                    <div className="w-16 h-[2px] bg-orange-100 dark:bg-white/10" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors duration-700">
                    {product.name}
                  </h3>
                  <p className="text-stone-500 dark:text-neutral-400 text-lg font-light max-w-sm leading-relaxed italic">
                    {product.desc}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl text-stone-900 dark:text-white font-serif italic">{product.currency} {product.price}</span>
                  <div className="mt-4 flex flex-col items-end gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500/60 animate-pulse" />
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};