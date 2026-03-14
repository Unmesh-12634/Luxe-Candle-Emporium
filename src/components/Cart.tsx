import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Plus, Minus, Trash2, Edit3 } from 'lucide-react';
import logoAsset from 'figma:asset/2d1a7c1e0e0ba214033ec10afd82a134f3bad7c3.png';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedFragrance?: string;
  customNote?: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  theme?: 'dark' | 'light';
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  theme,
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isDark = theme === 'dark';

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[300] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Cart Panel - CRYSTAL DARK AESTHETIC */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 35, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-md z-[310] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col border-l border-white/10 bg-[#080808]/95 backdrop-blur-3xl text-[#F5E6C8]"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

        <div className="relative p-8 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-4">
            <img src={logoAsset} alt="Luxe Candle Emporium" className={`h-16 w-auto object-contain transition-all duration-500 invert brightness-125`} />
            <div>
              <h2 className="text-xl font-serif italic tracking-tight">Your Sanctuary</h2>
              <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 font-bold">Refining atmosphere</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-4 border border-white/10 rounded-full transition-all hover:bg-white/5 group active:scale-90"
          >
            <X className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto p-8 space-y-10 hide-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40 py-20">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full" />
                <ShoppingBag className="w-16 h-16 stroke-[0.5px] relative" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.6em] font-bold italic">The archive is silent</p>
              <button
                onClick={onClose}
                className="text-[9px] uppercase tracking-[0.4em] text-amber-500 border-b border-amber-500/20 pb-1"
              >
                Return to Collections
              </button>
            </div>
          ) : (
            items.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="flex gap-8 group"
              >
                <div className="w-24 h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-2xl bg-stone-900 border border-white/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                </div>
                <div className="flex-1 space-y-4 py-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-serif italic text-2xl tracking-tighter text-white">{item.name}</h3>
                      <div className="flex flex-col gap-1">
                        <p className="text-[9px] uppercase tracking-[0.4em] opacity-40 italic">Signature Batch No. 02</p>
                        {item.selectedFragrance && (
                          <p className="text-[10px] text-amber-500/80 font-serif italic">Scent: {item.selectedFragrance}</p>
                        )}
                        {item.customNote && (
                          <div className="mt-4 p-4 rounded-[2rem] bg-white/[0.03] border border-white/5 relative group/note">
                            <div className="flex items-center gap-2 mb-2">
                              <Edit3 className="w-2.5 h-2.5 text-amber-500/50" />
                              <p className="text-[7px] uppercase tracking-[0.3em] opacity-40 font-black">Bespoke Request</p>
                            </div>
                            <p className="text-[11px] leading-relaxed opacity-70 font-serif italic break-words pr-4">
                              "{item.customNote}"
                            </p>
                            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-amber-500/20" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-6 rounded-full px-5 py-2.5 border border-white/10 bg-white/5">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-amber-500 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-bold w-4 text-center text-white">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-amber-500 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-end flex-col">
                      <p className="font-serif text-xl text-amber-500">₹{item.price}</p>
                      <button onClick={() => onRemove(item.id)} className="opacity-50 hover:opacity-100 text-red-400 hover:text-red-500 transition-all p-2 mt-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="relative p-10 space-y-8 border-t border-white/5 bg-[#050505]/80 backdrop-blur-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[9px] uppercase tracking-[0.5em] opacity-30 font-bold">Atmosphere Total</span>
              <span className="text-3xl font-serif tracking-tighter text-white">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-end pb-4 border-b border-white/10">
              <span className="text-[9px] uppercase tracking-[0.5em] opacity-30 font-bold">White Glove Delivery</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-amber-500 italic">Complimentary</span>
            </div>
          </div>

          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className={`w-full py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] transition-all shadow-2xl ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500' : 'bg-stone-900 text-white hover:bg-black'}`}
          >
            Order Now
          </button>

          <div className="flex items-center justify-center gap-6 opacity-[0.08]">
            <span className="w-16 h-[0.5px] bg-white" />
            <p className="text-[8px] uppercase tracking-[0.8em] font-black">Lux Emporium Studio</p>
            <span className="w-16 h-[0.5px] bg-white" />
          </div>
        </div>
      </motion.div>
    </>
  );
};