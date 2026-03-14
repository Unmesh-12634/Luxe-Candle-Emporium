import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, X, Plus, Minus, ShoppingBag, Sparkles, Gift, Heart } from 'lucide-react';

// Import candle images
import bubbleCandle1 from 'figma:asset/37c645db17b5ecf1641812eae60dcc749024836f.png';
import peonyCandle from 'figma:asset/7d9d780091fbbe3c8de325444dbfe13bbbffd8ae.png';
import oceanCandle1 from 'figma:asset/c0d9c3c974825ada3115f53150a9b6be1a376382.png';
import icedLatte1 from 'figma:asset/33d57ddd7902a4a440a31a1425f590f82a204559.png';
import champagneCandle1 from 'figma:asset/65d14f9ea7c1b190df62615226b294245836027b.png';
import knotBouquet1 from 'figma:asset/81b1caad13ac4674f07bb48ca5d7ba12d52f9114.png';
import peonyBouquet1 from '../assets/a40dfc2904a131986451fd6c94ec74e024e2c1f5.png';
import daisyBouquet1 from '../assets/32068fcffff9a8c23315136d41f2b6526232b476.png';

interface GiftPack {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  items: Array<{
    name: string;
    image: string;
    quantity: number;
    fragrance: string;
  }>;
  image: string;
  badge?: string;
  category: string;
}

interface GiftingProps {
  theme: 'dark' | 'light';
  onAddToCart: (product: any) => void;
}

const GIFT_PACKS: GiftPack[] = [
  {
    id: 'gift-1',
    name: 'Luxe Starter Collection',
    description: 'Perfect introduction to our handcrafted candles. Experience three of our most beloved scents.',
    price: 449,
    originalPrice: 537,
    badge: 'Best Seller',
    category: 'Starter Sets',
    image: bubbleCandle1,
    items: [
      { name: 'Bubble Candle', image: bubbleCandle1, quantity: 1, fragrance: 'Rose' },
      { name: 'Peony Bouquet Candle', image: peonyBouquet1, quantity: 1, fragrance: 'Rose, Lavender, Jasmine' },
      { name: 'Ocean Candle', image: oceanCandle1, quantity: 1, fragrance: 'Ocean Breeze' }
    ]
  },
  {
    id: 'gift-2',
    name: 'Premium Elegance Set',
    description: 'A curated collection of our premium artisan candles for the discerning connoisseur.',
    price: 899,
    originalPrice: 1098,
    badge: 'Premium',
    category: 'Luxury Sets',
    image: champagneCandle1,
    items: [
      { name: 'Champagne Candle', image: champagneCandle1, quantity: 1, fragrance: 'Champagne & Berries' },
      { name: 'Knot Bouquet Candle', image: knotBouquet1, quantity: 1, fragrance: 'Lavender' },
      { name: 'Daisy Bouquet Candle', image: daisyBouquet1, quantity: 1, fragrance: 'Rose, Jasmine, Lavender, Vanilla' },
      { name: 'Bubble Candle', image: bubbleCandle1, quantity: 2, fragrance: 'Mixed' }
    ]
  },
  {
    id: 'gift-3',
    name: 'Cozy Moments Duo',
    description: 'Two complementary candles designed to create the perfect ambiance for relaxation.',
    price: 349,
    originalPrice: 398,
    category: 'Duo Sets',
    image: icedLatte1,
    items: [
      { name: 'Iced Latte Candle', image: icedLatte1, quantity: 1, fragrance: 'Coffee & Vanilla' },
      { name: 'Peony Bouquet Candle', image: peonyBouquet1, quantity: 1, fragrance: 'Rose, Lavender, Jasmine' },
      { name: 'Bubble Candle', image: bubbleCandle1, quantity: 1, fragrance: 'Lavender' }
    ]
  },
  {
    id: 'gift-4',
    name: 'Floral Paradise Collection',
    description: 'Immerse yourself in a garden of delicate floral scents with this exquisite collection.',
    price: 649,
    originalPrice: 796,
    badge: 'Trending',
    category: 'Floral Sets',
    image: peonyBouquet1,
    items: [
      { name: 'Peony Bouquet Candle', image: peonyBouquet1, quantity: 1, fragrance: 'Rose, Lavender, Jasmine' },
      { name: 'Knot Bouquet Candle', image: knotBouquet1, quantity: 1, fragrance: 'Lavender' },
      { name: 'Bubble Candle', image: bubbleCandle1, quantity: 1, fragrance: 'Jasmine' }
    ]
  },
  {
    id: 'gift-5',
    name: 'Ocean Serenity Trio',
    description: 'Bring the calming essence of the ocean into your home with this refreshing trio.',
    price: 549,
    originalPrice: 637,
    category: 'Wellness Sets',
    image: oceanCandle1,
    items: [
      { name: 'Ocean Candle', image: oceanCandle1, quantity: 2, fragrance: 'Ocean Breeze' },
      { name: 'Bubble Candle', image: bubbleCandle1, quantity: 1, fragrance: 'Lavender' }
    ]
  },
  {
    id: 'gift-6',
    name: 'Complete Luxury Experience',
    description: 'Our ultimate gift set featuring a selection of all our signature candles for the ultimate luxury experience.',
    price: 1299,
    originalPrice: 1592,
    badge: 'Ultimate Gift',
    category: 'Complete Sets',
    image: champagneCandle1,
    items: [
      { name: 'Champagne Candle', image: champagneCandle1, quantity: 1, fragrance: 'Champagne & Berries' },
      { name: 'Knot Bouquet Candle', image: knotBouquet1, quantity: 1, fragrance: 'Lavender' },
      { name: 'Daisy Bouquet Candle', image: daisyBouquet1, quantity: 1, fragrance: 'Rose, Jasmine, Lavender, Vanilla' },
      { name: 'Peony Bouquet Candle', image: peonyBouquet1, quantity: 1, fragrance: 'Rose, Lavender, Jasmine' },
      { name: 'Ocean Candle', image: oceanCandle1, quantity: 1, fragrance: 'Ocean Breeze' },
      { name: 'Iced Latte Candle', image: icedLatte1, quantity: 1, fragrance: 'Coffee & Vanilla' },
      { name: 'Bubble Candle', image: bubbleCandle1, quantity: 2, fragrance: 'Mixed' }
    ]
  }
];

export function Gifting({ theme, onAddToCart }: GiftingProps) {
  const [selectedPack, setSelectedPack] = useState<GiftPack | null>(null);
  const [quantity, setQuantity] = useState(1);
  const isDark = theme === 'dark';

  const handleAddToCart = () => {
    if (selectedPack) {
      onAddToCart({
        id: selectedPack.id,
        name: selectedPack.name,
        price: selectedPack.price,
        image: selectedPack.image,
        quantity: quantity,
        type: 'Gift Pack'
      });
      setSelectedPack(null);
      setQuantity(1);
    }
  };

  const categories = Array.from(new Set(GIFT_PACKS.map(p => p.category)));

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-1000 ${isDark ? 'bg-[#0F0F0F] text-[#F5E6C8]' : 'bg-[#FFF5F0] text-[#2D2D2D]'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full border border-amber-500/20 bg-amber-500/5">
            <Gift className="w-5 h-5 text-amber-500" />
            <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-amber-500">Curated Gift Sets</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-6">Gifting Collection</h1>
          <p className="text-lg opacity-60 max-w-2xl mx-auto italic">
            Thoughtfully curated candle gift sets perfect for any occasion. Each pack is beautifully presented and ready to delight.
          </p>
        </motion.div>

        {/* Gift Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {GIFT_PACKS.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedPack(pack)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
              }`}
            >
              {/* Badge */}
              {pack.badge && (
                <div className="absolute top-6 right-6 z-10 bg-gradient-to-r from-amber-600 to-amber-500 text-black px-4 py-2 rounded-full">
                  <p className="text-[8px] uppercase tracking-[0.3em] font-bold">{pack.badge}</p>
                </div>
              )}

              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                {/* Items Count Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
                  <Package className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-white">{pack.items.length} Items</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-40 mb-2">{pack.category}</p>
                  <h3 className="text-2xl font-serif italic tracking-tight mb-2">{pack.name}</h3>
                  <p className="text-sm opacity-60 line-clamp-2">{pack.description}</p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-serif italic text-amber-500">₹{pack.price}</span>
                  <span className="text-sm opacity-40 line-through">₹{pack.originalPrice}</span>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                    Save ₹{pack.originalPrice - pack.price}
                  </span>
                </div>

                {/* CTA */}
                <button className={`w-full py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] transition-all ${
                  isDark 
                    ? 'bg-amber-600 text-black hover:bg-amber-500' 
                    : 'bg-stone-900 text-white hover:bg-black'
                }`}>
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPack && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPack(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[300]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl z-[310] ${
                isDark ? 'bg-[#0F0F0F] border border-white/10' : 'bg-white border border-black/10'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPack(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.4em] font-bold opacity-40 mb-2">{selectedPack.category}</p>
                    <h2 className="text-4xl font-serif italic tracking-tight mb-3">{selectedPack.name}</h2>
                    <p className="text-base opacity-60 max-w-xl">{selectedPack.description}</p>
                  </div>
                  {selectedPack.badge && (
                    <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-black px-5 py-2 rounded-full">
                      <p className="text-[8px] uppercase tracking-[0.3em] font-bold">{selectedPack.badge}</p>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-serif italic text-amber-500">₹{selectedPack.price}</span>
                  <span className="text-lg opacity-40 line-through">₹{selectedPack.originalPrice}</span>
                  <span className="text-sm font-bold text-green-500 bg-green-500/10 px-4 py-2 rounded-full">
                    Save {Math.round(((selectedPack.originalPrice - selectedPack.price) / selectedPack.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              {/* Items Grid */}
              <div className="p-8">
                <h3 className="text-xl font-serif italic mb-6 flex items-center gap-3">
                  <Package className="w-5 h-5 text-amber-500" />
                  What's Included ({selectedPack.items.length} items)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  {selectedPack.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                      }`}
                    >
                      <div className="aspect-square rounded-xl overflow-hidden mb-3">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-sm font-serif italic mb-1">{item.name}</h4>
                      <p className="text-xs opacity-60 mb-2">{item.fragrance}</p>
                      <p className="text-xs font-bold text-amber-500">Qty: {item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-6 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <span className="font-bold text-sm uppercase tracking-wider">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-serif italic w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-5 rounded-full font-bold text-[11px] uppercase tracking-[0.5em] transition-all shadow-2xl flex items-center justify-center gap-4 ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black hover:shadow-amber-500/40'
                      : 'bg-gradient-to-r from-stone-900 to-black text-white hover:shadow-black/40'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart - ₹{selectedPack.price * quantity}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
