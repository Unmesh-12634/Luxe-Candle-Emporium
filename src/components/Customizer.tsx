import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, Info } from 'lucide-react';

const SHAPES = [
  { id: 'jar', name: 'Signature Jar', price: 0 },
  { id: 'bubble', name: 'Sculptural Bubble', price: 6 },
  { id: 'diya', name: 'Ceramic Diya', price: 12 },
];

const COLORS = [
  { id: 'bone', name: 'Bone White', hex: '#F9F6F2' },
  { id: 'slate', name: 'Midnight Slate', hex: '#1C1C1C' },
  { id: 'amber', name: 'Raw Amber', hex: '#D97706' },
  { id: 'sage', name: 'Whithered Sage', hex: '#4B5320' },
];

const FRAGRANCES = [
  { id: 'v', name: 'Smoked Vanilla', notes: 'Sandalwood, Bean, Oak' },
  { id: 'j', name: 'Moonlit Jasmine', notes: 'Bloom, Tea, Musk' },
  { id: 'c', name: 'Atlas Cedar', notes: 'Moss, Resin, Pine' },
];

export const Customizer: React.FC = () => {
  const [selections, setSelections] = useState({
    shape: 'jar',
    color: 'bone',
    fragrance: 'v',
    text: '',
  });

  const basePrice = 32;
  const currentShape = SHAPES.find(s => s.id === selections.shape);
  const total = basePrice + (currentShape?.price || 0);

  return (
    <section id="custom" className="py-32 bg-neutral-900 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-20 lg:items-start">
          
          {/* Visual Canvas */}
          <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit">
            <div className="relative aspect-square w-full rounded-3xl bg-neutral-950 flex items-center justify-center overflow-hidden border border-white/5">
              {/* Dynamic Candle Preview */}
              <motion.div
                key={selections.color + selections.shape}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative flex flex-col items-center"
              >
                <div 
                  className="w-40 h-56 rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden transition-colors duration-1000"
                  style={{ backgroundColor: COLORS.find(c => c.id === selections.color)?.hex }}
                >
                  {/* Subtle Shading */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10" />
                  
                  {/* Etched Text */}
                  <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                    <p className={`font-serif text-sm italic tracking-widest uppercase transition-colors duration-500 ${
                      selections.color === 'slate' ? 'text-white/30' : 'text-black/20'
                    }`}>
                      {selections.text || "Your Aura"}
                    </p>
                  </div>
                </div>
                {/* Surface Reflection */}
                <div className="w-56 h-6 bg-black/40 blur-2xl rounded-full mt-2" />
              </motion.div>

              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0%,transparent_70%)]" />
            </div>
            
            <div className="mt-8 flex items-center gap-4 text-neutral-500">
              <Info className="w-4 h-4" />
              <p className="text-[10px] uppercase tracking-[0.2em]">Estimated delivery: 5-7 business days</p>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="lg:w-1/2">
            <div className="max-w-xl">
              <span className="text-amber-500 uppercase tracking-[0.4em] text-[10px] font-medium">Bespoke Studio</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-12 leading-tight">Create Your Masterpiece</h2>
              
              <div className="space-y-12">
                {/* Shape */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">01. Silhouette</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SHAPES.map(shape => (
                      <button
                        key={shape.id}
                        onClick={() => setSelections({...selections, shape: shape.id})}
                        className={`p-6 rounded-2xl border transition-all duration-500 text-left relative ${
                          selections.shape === shape.id 
                          ? 'border-amber-500 bg-amber-500/5' 
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <p className={`text-sm tracking-wide ${selections.shape === shape.id ? 'text-white' : 'text-neutral-500'}`}>
                          {shape.name}
                        </p>
                        {shape.price > 0 && <p className="text-[10px] text-amber-500/60 mt-1">+$ {shape.price}</p>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">02. Palette</h3>
                  <div className="flex flex-wrap gap-5">
                    {COLORS.map(color => (
                      <button
                        key={color.id}
                        onClick={() => setSelections({...selections, color: color.id})}
                        className={`w-14 h-14 rounded-full border transition-all flex items-center justify-center relative ${
                          selections.color === color.id ? 'border-amber-500 scale-110 shadow-lg' : 'border-white/10'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {selections.color === color.id && (
                          <Check className={`w-5 h-5 ${color.id === 'slate' ? 'text-white' : 'text-black/50'}`} />
                        )}
                        <span className="absolute -bottom-6 text-[8px] uppercase tracking-widest whitespace-nowrap text-neutral-500">
                          {color.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fragrance */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">03. Scent Profile</h3>
                  <div className="space-y-4">
                    {FRAGRANCES.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setSelections({...selections, fragrance: f.id})}
                        className={`w-full p-6 rounded-2xl border transition-all duration-500 text-left flex justify-between items-center ${
                          selections.fragrance === f.id 
                          ? 'border-amber-500 bg-amber-500/5' 
                          : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                        }`}
                      >
                        <div>
                          <p className={`text-sm tracking-wide ${selections.fragrance === f.id ? 'text-white' : 'text-neutral-400'}`}>{f.name}</p>
                          <p className="text-[10px] text-neutral-600 mt-1">{f.notes}</p>
                        </div>
                        {selections.fragrance === f.id && <Check className="w-4 h-4 text-amber-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personalization */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">04. Etched Message</h3>
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="E.g. RADIANCE"
                    value={selections.text}
                    onChange={(e) => setSelections({...selections, text: e.target.value.toUpperCase()})}
                    className="w-full bg-neutral-950 border border-white/5 rounded-2xl p-6 text-white placeholder:text-neutral-800 focus:outline-none focus:border-amber-500 transition-colors uppercase tracking-widest text-sm"
                  />
                </div>

                <div className="pt-8 flex items-center justify-between border-t border-white/5">
                  <div>
                    <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-1">Total Value</p>
                    <p className="text-3xl text-white font-serif">$ {total}.00</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-neutral-950 px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-transform"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Place Order
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
