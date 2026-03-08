import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  const blur = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  return (
    <section className="relative h-[160vh] bg-[#fff5f0] dark:bg-neutral-950 transition-colors duration-700">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Cinematic Background */}
        <motion.div 
          style={{ scale, opacity, filter: `blur(${blur}px)` }}
          className="absolute inset-0 z-0"
        >
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1710237717354-5e8a26a50f80" 
            alt="Luxury Atmosphere"
            className="w-full h-full object-cover grayscale-[20%] brightness-[0.9] dark:brightness-[0.3] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fff5f0]/40 dark:from-neutral-950/60 via-transparent to-[#fff5f0] dark:to-neutral-950 transition-colors duration-700" />
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="flex items-center gap-3 px-6 py-2 rounded-full border border-orange-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-sm text-orange-700 dark:text-orange-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-12 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Artisanal Pours
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-9xl lg:text-[11rem] font-serif text-stone-900 dark:text-white mb-10 leading-[0.85] tracking-tighter"
            >
              Illuminating <br />
              <span className="text-orange-700 dark:text-orange-100/60 italic font-light">Your Essence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.8 }}
              className="text-stone-600 dark:text-neutral-400 text-base md:text-xl max-w-xl mb-12 leading-relaxed font-light tracking-wide px-4"
            >
              Discover a collection where fragrance meets artistry. 
              Sustainable ingredients, masterfully blended for the modern sanctuary.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Mouse scroll indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-orange-400/60 dark:text-stone-500"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Scroll to Discover</span>
          <motion.div 
            animate={{ height: [0, 45, 0], y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-[1.5px] bg-gradient-to-b from-orange-600 to-transparent" 
          />
        </motion.div>
      </div>
    </section>
  );
};
