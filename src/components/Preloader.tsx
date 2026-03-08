import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoAsset from 'figma:asset/2d1a7c1e0e0ba214033ec10afd82a134f3bad7c3.png';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ultra high-end, slow "lazy" pacing (5 seconds)
    const duration = 5000;
    const interval = 30;
    const steps = duration / interval;
    let step = 0;
  
    const timer = setInterval(() => {
      step++;
      // Custom easeOutExpo for the counter, smoothed out
      const easeOutExpo = (x: number): number => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      const rawProgress = step / steps;
      setProgress(Math.min(100, Math.floor(easeOutExpo(rawProgress) * 100)));
      
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 1800); // Linger lazily at 100% for a dramatic pause
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: "blur(12px)",
        transition: { duration: 2.0, ease: [0.85, 0, 0.15, 1] }
      }}
      className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Crystal Black Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#111111_0%,_#000000_60%)] pointer-events-none" />
      
      {/* Slow rotating geometric crystal facet */}
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200vw] h-[200vh] top-[-50vh] left-[-50vw] opacity-[0.15] pointer-events-none mix-blend-screen"
        style={{
          background: "conic-gradient(from 90deg at 50% 50%, #000 0%, #1a1a1a 15%, #000 30%, #222 50%, #000 70%, #1a1a1a 85%, #000 100%)"
        }}
      />

      {/* Sharp Glass/Crystal Reflection - Slowed down */}
      <motion.div 
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: 1 }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-45deg] pointer-events-none"
      />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 mt-[-5vh]">
        
        {/* Pro Cinematic Logo Reveal - Lazy timing */}
        <div className="relative w-56 md:w-80 flex justify-center items-center mb-10">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 2.5, delay: 0.4, ease: [0.85, 0, 0.15, 1] }}
            className="w-full relative flex justify-center"
          >
            <motion.img 
              initial={{ scale: 1.15, filter: "blur(15px)", y: 30 }}
              animate={{ scale: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 3.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={logoAsset} 
              alt="Luxe Candle Emporium Logo" 
              className="w-full h-auto object-contain opacity-100 mix-blend-screen"
              style={{ 
                filter: "invert(1) sepia(0.15) hue-rotate(330deg) brightness(1.3) contrast(1.1)",
                dropShadow: "0px 10px 30px rgba(212, 175, 55, 0.15)"
              }} 
            />
          </motion.div>
        </div>

        {/* Cinematic Typography Reveal - Lazy timing */}
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 2.0, delay: 1.0, ease: [0.85, 0, 0.15, 1] }}
          >
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-serif tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5F0] to-[#D4AF37] uppercase text-center drop-shadow-lg"
            >
              LUXE CANDLE
            </motion.h1>
          </motion.div>
          
          <motion.div 
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 2.0, delay: 1.4, ease: [0.85, 0, 0.15, 1] }}
            className="mt-6"
          >
            <motion.h2 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2.0, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] md:text-sm font-sans font-light tracking-[1em] uppercase text-white/40 text-center ml-[1em]"
            >
              EMPORIUM
            </motion.h2>
          </motion.div>
        </div>
      </div>

      {/* Razor-thin Minimalist Progress - Lazy timing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-16 w-full max-w-[400px] flex flex-col items-center gap-6 px-8"
      >
        <div className="w-full h-[1px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#FFF5F0] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        <div className="flex justify-between w-full text-[10px] md:text-xs uppercase tracking-[0.5em] text-white/30 font-light ml-[0.5em]">
          <span>Initiating</span>
          <span className="tabular-nums font-medium text-white/60">{progress.toString().padStart(3, '0')}%</span>
        </div>
      </motion.div>

    </motion.div>
  );
};