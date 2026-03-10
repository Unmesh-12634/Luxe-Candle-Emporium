import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  autoPlayInterval?: number;
  className?: string;
}

export const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  productName,
  autoPlayInterval = 5000,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images.length, autoPlayInterval, isHovering]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div
      className={`relative w-full h-full group ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Image Display */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              duration: 1.0,
              ease: [0.19, 1.0, 0.22, 1.0],
              opacity: { duration: 0.8 }
            }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={images[currentIndex]}
              alt={`${productName} - View ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110 transition-all duration-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToSlide(index, e)}
              className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? 'w-8 h-2 bg-amber-500'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};