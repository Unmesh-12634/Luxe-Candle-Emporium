import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CandleVesselProps {
  image: string;
  side: 'left' | 'right' | 'center';
  title?: string;
}

export const CandleVessel: React.FC<CandleVesselProps> = ({ image, side, title }) => {
  const containerClass = side === 'left' 
    ? "justify-start pl-[15%]" 
    : side === 'right' 
    ? "justify-end pr-[15%]" 
    : "justify-center";

  return (
    <div className={`w-full h-full flex items-center ${containerClass}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative group"
      >
        {/* Subtle Shadow/Glow under candle */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/40 blur-2xl rounded-full" />
        
        <div className="w-[280px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5 relative">
          <ImageWithFallback 
            src={image} 
            alt={title || "Candle"} 
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Scent Overlay */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60 mb-2">Signature Series</p>
            <h3 className="text-2xl font-serif italic">{title}</h3>
          </div>
        </div>

        {/* The Wick (Invisible target for the flame) */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-1 h-2 bg-neutral-800" />
      </motion.div>
    </div>
  );
};
