import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Sparkles, Wind, Heart, Zap, Flower2, Plus } from 'lucide-react';

interface FragranceBarProps {
  theme: 'dark' | 'light';
}

interface Fragrance {
  id: string;
  name: string;
  category: string;
  description: string;
  notes: string[];
  mood: string;
  color: string;
  image: string;
  icon: React.ReactNode;
}

const FRAGRANCES: Fragrance[] = [
  {
    id: 'frag-1',
    name: 'Madagascar Vanilla',
    category: 'Sweet & Warm',
    description: 'Rich, creamy vanilla with hints of caramel and exotic spices. Creates a warm, comforting atmosphere.',
    notes: ['Vanilla Bean', 'Caramel', 'Tonka Bean', 'Warm Spices'],
    mood: 'Cozy & Comforting',
    color: 'from-amber-600 to-amber-400',
    image: 'https://images.unsplash.com/photo-1719546194294-f0117d93f7a5',
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: 'frag-2',
    name: 'French Lavender',
    category: 'Floral & Fresh',
    description: 'Pure lavender fields of Provence. Calming and therapeutic with subtle herbal undertones.',
    notes: ['Lavender', 'Eucalyptus', 'Sage', 'Mint'],
    mood: 'Relaxing & Peaceful',
    color: 'from-purple-600 to-purple-400',
    image: 'https://images.unsplash.com/photo-1593715857989-e22fd13c27d0',
    icon: <Flower2 className="w-5 h-5" />
  },
  {
    id: 'frag-3',
    name: 'Damascus Rose',
    category: 'Floral & Romantic',
    description: 'Luxurious rose petals with a touch of jasmine. Elegant and sophisticated.',
    notes: ['Rose Petals', 'Jasmine', 'Peony', 'Pink Pepper'],
    mood: 'Romantic & Elegant',
    color: 'from-pink-600 to-rose-400',
    image: 'https://images.unsplash.com/photo-1526421515403-b7e0ae86ee4f',
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 'frag-4',
    name: 'Indian Sandalwood',
    category: 'Woody & Earthy',
    description: 'Deep, creamy sandalwood with amber and musk. Grounding and meditative.',
    notes: ['Sandalwood', 'Amber', 'Musk', 'Cedar'],
    mood: 'Grounding & Meditative',
    color: 'from-orange-700 to-orange-500',
    image: 'https://images.unsplash.com/photo-1762172222047-93a15c62d89c',
    icon: <Wind className="w-5 h-5" />
  },
  {
    id: 'frag-5',
    name: 'Ocean Breeze',
    category: 'Fresh & Aquatic',
    description: 'Crisp ocean air with sea salt and driftwood. Refreshing and invigorating.',
    notes: ['Sea Salt', 'Driftwood', 'Marine', 'White Musk'],
    mood: 'Fresh & Energizing',
    color: 'from-cyan-600 to-blue-400',
    image: 'https://images.unsplash.com/photo-1655088853536-882a0b83c151',
    icon: <Droplets className="w-5 h-5" />
  },
  {
    id: 'frag-6',
    name: 'Midnight Jasmine',
    category: 'Floral & Exotic',
    description: 'Exotic night-blooming jasmine with hints of neroli and white flowers.',
    notes: ['Jasmine', 'Neroli', 'Tuberose', 'Orange Blossom'],
    mood: 'Exotic & Sensual',
    color: 'from-green-600 to-emerald-400',
    image: 'https://images.unsplash.com/photo-1659286469998-dd1dec90909a',
    icon: <Flower2 className="w-5 h-5" />
  },
  {
    id: 'frag-7',
    name: 'Coffee & Vanilla',
    category: 'Gourmand',
    description: 'Rich espresso blended with smooth vanilla and a hint of chocolate.',
    notes: ['Coffee Bean', 'Vanilla', 'Dark Chocolate', 'Cream'],
    mood: 'Warm & Inviting',
    color: 'from-stone-700 to-amber-600',
    image: 'https://images.unsplash.com/photo-1710082336769-618ecffe6e7f',
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: 'frag-8',
    name: 'Champagne & Berries',
    category: 'Fruity & Sparkling',
    description: 'Effervescent champagne with fresh berries and citrus zest. Celebratory and uplifting.',
    notes: ['Champagne', 'Strawberry', 'Raspberry', 'Citrus'],
    mood: 'Celebratory & Joyful',
    color: 'from-rose-500 to-pink-300',
    image: 'https://images.unsplash.com/photo-1588990625686-c730e780ebfe',
    icon: <Sparkles className="w-5 h-5" />
  }
];

export function FragranceBar({ theme }: FragranceBarProps) {
  const [selectedFragrance, setSelectedFragrance] = useState<string | null>(null);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-1000 ${isDark ? 'bg-[#050505] text-[#F5E6C8]' : 'bg-[#FFF5F0] text-[#2D2D2D]'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative z-10"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm">
            <Droplets className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-500">Signature Scents</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-6">Fragrance Bar</h1>
          <p className="text-lg opacity-60 max-w-2xl mx-auto italic font-light">
            Explore our curated collection of premium fragrances. Each scent is carefully crafted to evoke emotion and create ambiance.
          </p>
        </motion.div>

        {/* Cinematic Fragrances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {FRAGRANCES.map((fragrance, index) => (
            <motion.div
              key={fragrance.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setSelectedFragrance(fragrance.id)}
              onMouseLeave={() => setSelectedFragrance(null)}
              className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer isolate"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={fragrance.image} 
                  alt={fragrance.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80" />
              <div className={`absolute inset-0 bg-gradient-to-br ${fragrance.color} opacity-0 group-hover:opacity-30 mix-blend-overlay z-10 transition-opacity duration-700`} />

              {/* Content Container */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                {/* Top Icon - Visible on hover */}
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 border border-white/20">
                  {fragrance.icon}
                </div>

                {/* Default State Content */}
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500/80 mb-3 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-amber-500/50" />
                    {fragrance.category}
                  </p>
                  <h3 className="text-3xl font-serif italic tracking-tight text-white drop-shadow-lg">{fragrance.name}</h3>
                </div>

                {/* Hover State Content - Hidden by default */}
                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100 mt-4">
                  <p className="text-sm text-white/80 font-light leading-relaxed mb-6">
                    {fragrance.description}
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">Key Notes</p>
                    <div className="flex flex-wrap gap-2">
                      {fragrance.notes.slice(0, 3).map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10"
                        >
                          {note}
                        </span>
                      ))}
                      {fragrance.notes.length > 3 && (
                        <span className="text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 text-white/60 backdrop-blur-sm border border-white/5">
                          +{fragrance.notes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Border reveal on hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-3xl transition-colors duration-500 z-30 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden isolate"
        >
          {/* Background image for info section */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1771226281605-f1e505ade901" 
               alt="Aesthetic Fragrance" 
               className="w-full h-full object-cover scale-105"
             />
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 p-12 md:p-16 border border-white/10 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
              <div className="space-y-6">
                <div className="p-4 rounded-full bg-amber-500/10 w-fit border border-amber-500/20">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-serif italic text-white">Premium Ingredients</h3>
                <p className="text-sm opacity-60 leading-relaxed font-light">
                  All our fragrances are crafted using premium essential oils and natural extracts sourced from around the world. No synthetic fillers.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-full bg-amber-500/10 w-fit border border-amber-500/20">
                  <Droplets className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-serif italic text-white">Long-Lasting Scent</h3>
                <p className="text-sm opacity-60 leading-relaxed font-light">
                  Our proprietary blend ensures consistent fragrance throw throughout the entire burn time, releasing notes gradually as it burns.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-full bg-amber-500/10 w-fit border border-amber-500/20">
                  <Wind className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-2xl font-serif italic text-white">Custom Blending</h3>
                <p className="text-sm opacity-60 leading-relaxed font-light">
                  Can't find your perfect scent? We offer custom fragrance blending services. Contact our artisans to create your signature scent.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
