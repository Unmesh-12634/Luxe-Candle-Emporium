import React from 'react';
import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ImageWithFallback } from './figma/ImageWithFallback';

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1664178266014-962656266911",
  "https://images.unsplash.com/photo-1671177743599-952231ec6846",
  "https://images.unsplash.com/photo-1745052838929-39e6579e130e",
  "https://images.unsplash.com/photo-1658316342181-1b90e17734ce",
  "https://images.unsplash.com/photo-1665124197613-ffbb755f4ac2",
  "https://images.unsplash.com/photo-1701987432961-831aa2aa9b34",
  "https://images.unsplash.com/photo-1734771708318-b8cb38c095d0",
  "https://images.unsplash.com/photo-1724007817364-d2fd7cf174b6",
  "https://images.unsplash.com/photo-1649344164842-3196fd796ac0",
];

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-32 bg-stone-50 dark:bg-neutral-950 transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-amber-600 uppercase tracking-[0.5em] text-[10px] block mb-6"
          >
            Visual Journey
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-stone-900 dark:text-white mb-4"
          >
            Sanctuary <span className="italic font-light text-stone-400 dark:text-neutral-500">Impressions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-xl mx-auto font-light"
          >
            Follow our journey as we transform spaces through the alchemy of light and scent.
          </motion.p>
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
          <Masonry gutter="24px">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="rounded-2xl overflow-hidden cursor-pointer group relative shadow-md hover:shadow-xl transition-all duration-500 bg-white"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Gallery image ${i}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
        
        <div className="mt-20 text-center">
          <button className="text-[10px] uppercase tracking-[0.4em] text-stone-400 hover:text-amber-600 transition-colors border-b border-stone-200 dark:border-white/10 pb-2">
            View More on Instagram
          </button>
        </div>
      </div>
    </section>
  );
};
