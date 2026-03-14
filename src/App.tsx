import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { CandleVessel } from './components/CandleVessel';
import { Store } from './components/Store';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';
import { Gifting } from './components/Gifting';
import { FragranceBar } from './components/FragranceBar';
import { Journal } from './components/Journal';
import { Preloader } from './components/Preloader';
import {
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Instagram,
  Twitter,
  Mail,
  Star,
  Quote,
  Moon,
  Sun,
  Palette,
  Droplets,
  Layers,
  Sparkles,
  ChevronRight,
  BookOpen,
  Beaker,
  History,
  Wind,
  Droplets as DropletsIcon,
  Zap,
  Compass,
  ArrowDown,
  Clock,
  Tag,
  Circle,
  Gift
} from 'lucide-react';

// Import real candle product images
import bubbleCandle1 from 'figma:asset/37c645db17b5ecf1641812eae60dcc749024836f.png';
import knotBouquet1 from 'figma:asset/81b1caad13ac4674f07bb48ca5d7ba12d52f9114.png';
import oceanCandle1 from 'figma:asset/c0d9c3c974825ada3115f53150a9b6be1a376382.png';
import icedLatte1 from 'figma:asset/33d57ddd7902a4a440a31a1425f590f82a204559.png';
import champagneCandle1 from 'figma:asset/65d14f9ea7c1b190df62615226b294245836027b.png';
import daisyBouquet1 from './assets/32068fcffff9a8c23315136d41f2b6526232b476.png';
import peonyCandle from 'figma:asset/7d9d780091fbbe3c8de325444dbfe13bbbffd8ae.png';
import peonyBouquet1 from './assets/a40dfc2904a131986451fd6c94ec74e024e2c1f5.png';
import ladduCandle1 from 'figma:asset/51c28d9bee12628c01b14baa77c24ebc63efc910.png';

// Hero section images
import heroCandleAsset from 'figma:asset/c0165306a09493da6520a8dfc5d4217a7ecfc03b.png';
import heroBgAsset from 'figma:asset/d5539051c6dc0d6abe4e32c8180748a2cf5907a6.png';

// Collection section images (grayscale to color effect)
import pinkFlowerHand from 'figma:asset/efce95a1256b38d831251c4a6e78934210b4f52c.png';
import beachCandle from 'figma:asset/5fbfee485d3a10d6aa6b1fe0f71a58e26df44219.png';
import coupleCandle2 from 'figma:asset/8ad527b1983978884cb84c1d4b45c3b545f0221b.png';
import flowerBouquet1 from 'figma:asset/6f230fbffef67dc7ed09b1535bc790c001a02de5.png';

// Data Types
type Section = 'home' | 'store' | 'journal' | 'studio' | 'gifting' | 'fragranceBar' | 'bestsellers';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedFragrance?: string;
  customNote?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedFragrance?: string;
  customNote?: string;
}

// Static Data
const TAXONOMY = [
  { title: "Floral Artistry", desc: "Delicate flower-inspired candles that capture nature's beauty.", image: pinkFlowerHand, icon: <Layers className="w-5 h-5" /> },
  { title: "Coastal Collection", desc: "Ocean-themed gel candles with seashells and sand.", image: beachCandle, icon: <Sparkles className="w-5 h-5" /> },
  { title: "Romantic Flames", desc: "Couple candles symbolizing togetherness and warmth.", image: coupleCandle2, icon: <DropletsIcon className="w-5 h-5" /> },
  { title: "Signature Bouquets", desc: "Hand-crafted flower bouquet candles wrapped with elegance.", image: flowerBouquet1, icon: <Palette className="w-5 h-5" /> }
];

const SCENT_NOTES = [
  { id: 'leather', label: 'Nocturnal Suede', color: 'bg-[#3D2B1F]' },
  { id: 'amber', label: 'Golden Resin', color: 'bg-[#D4AF37]' },
  { id: 'fig', label: 'Ethereal Fig', color: 'bg-[#4A5D4E]' },
  { id: 'oud', label: 'Velvet Oud', color: 'bg-[#2D1B1B]' }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setOrderConfirmed(true);
    setCartOpen(false);
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(false);
    setCartItems([]);
    setToastMessage("Payment done!");
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancelOrder = () => {
    setOrderConfirmed(false);
    setToastMessage("Payment cancelled");
    setToastType('error');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        item.selectedFragrance === product.selectedFragrance &&
        item.customNote === product.customNote
      );

      if (existing) {
        setToastMessage(`${product.name} quantity updated!`);
        setToastType('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return prev.map(item =>
          (item.id === product.id &&
            item.selectedFragrance === product.selectedFragrance &&
            item.customNote === product.customNote)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      setToastMessage(`${product.name} added to sanctuary!`);
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const isDark = theme === 'dark';
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0F0F0F] text-[#F5E6C8]' : 'bg-[#FFF5F0] text-[#2D2D2D]'}`}>
      <style dangerouslySetInnerHTML={{
        __html: `
        ::selection { background: ${isDark ? 'rgba(212, 175, 55, 0.3)' : 'rgba(138, 154, 91, 0.3)'}; color: ${isDark ? '#D4AF37' : '#2D2D2D'}; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Minimal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[150] transition-all duration-500">
        <div className={`px-6 lg:px-12 py-6 transition-all duration-500 ${isDark ? 'bg-[#0F0F0F]/40' : 'bg-[#FFF5F0]/40'} backdrop-blur-xl border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left: Brand & Links */}
            <div className="flex items-center gap-12 flex-1">
              <div onClick={() => setView('home')} className="cursor-pointer z-50 hover:opacity-80 transition-opacity">
                <h1 className="text-lg md:text-xl font-serif italic tracking-tighter uppercase whitespace-nowrap">LUXE CANDLE EMPORIUM</h1>
              </div>
              <div className="hidden xl:flex items-center gap-10">
                {[
                  { name: 'Bestsellers', view: 'bestsellers' },
                  { name: 'Gifting', view: 'gifting' },
                  { name: 'Shop All', view: 'store' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setView(item.view as Section)}
                    className={`text-[10px] uppercase tracking-[0.5em] font-bold transition-all hover:translate-y-[-2px] relative group ${view === item.view ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-current transition-all duration-500 group-hover:w-full ${view === item.view ? 'w-full' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center justify-end gap-3 md:gap-4">
              <button
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className={`p-2.5 rounded-full transition-all active:scale-90 ${isDark ? 'bg-white/5 text-amber-500 hover:bg-white/10' : 'bg-black/5 text-stone-800 hover:bg-black/10'}`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className={`relative p-2.5 rounded-full transition-all active:scale-90 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
              >
                <ShoppingBag className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg ${isDark ? 'bg-amber-600 text-black' : 'bg-stone-800 text-white'}`}>
                    {cartItems.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`p-2.5 rounded-full xl:hidden transition-all active:scale-90 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}
              >
                <Menu className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`hidden xl:flex p-3 px-6 rounded-full transition-all shadow-lg active:scale-95 items-center gap-3 ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500' : 'bg-stone-900 text-white hover:bg-black'}`}
              >
                <span className="text-[10px] uppercase tracking-widest font-bold">Menu</span>
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Advanced Sidebar Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[200]"
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl z-[210] flex flex-col bg-[#050505] text-white overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border-l border-white/10"
            >
              <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://images.unsplash.com/photo-1767500074794-14650311865f')] bg-cover bg-center grayscale scale-110" />

              <div className="relative flex-1 p-8 md:p-16 flex flex-col min-h-0 overflow-y-auto hide-scrollbar">
                <div className="flex justify-between items-center mb-12 md:mb-20 flex-shrink-0">
                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-serif italic tracking-tighter uppercase">Menu</h3>
                    <div className="w-8 h-[1px] bg-amber-500" />
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-3 md:p-5 border border-white/10 rounded-full hover:bg-white/5 transition-all group active:scale-90">
                    <X className="w-5 h-5 md:w-8 md:h-8 group-hover:rotate-180 transition-transform duration-700" />
                  </button>
                </div>

                <div className="flex-1 space-y-6 md:space-y-10">
                  {[
                    { label: 'Bestsellers', view: 'bestsellers', sub: 'Top selling candles', num: '01' },
                    { label: 'Gifting', view: 'gifting', sub: 'Curated gift sets', num: '02' },
                    { label: 'Shop All', view: 'store', sub: 'Complete collection', num: '03' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: 40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        onClick={() => { setView(item.view as Section); setIsMenuOpen(false); }}
                        className="group text-left block w-full relative"
                      >
                        <div className="flex items-baseline gap-4 md:gap-6">
                          <span className="text-[8px] md:text-[10px] font-bold tracking-[0.5em] text-amber-500/40 group-hover:text-amber-500 transition-colors">{item.num}</span>
                          <div className="space-y-1 md:space-y-2">
                            <h3 className="text-3xl md:text-6xl font-serif italic transition-all duration-700 group-hover:translate-x-4 tracking-tighter">
                              {item.label}
                            </h3>
                            <p className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-white/20 group-hover:text-white/60 transition-all duration-500 group-hover:translate-x-4">{item.sub}</p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-12 mt-12 border-t border-white/10 flex-shrink-0">
                  <div className="grid grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-3">
                      <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500">Visit Us</p>
                      <p className="text-xs font-light opacity-40 leading-relaxed italic">
                        78 Artisan Way, <br />
                        Brooklyn, NY 11201
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-amber-500">Connect</p>
                      <div className="flex gap-4 md:gap-6">
                        <Instagram className="w-4 h-4 md:w-5 md:h-5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
                        <Twitter className="w-4 h-4 md:w-5 md:h-5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
                        <Mail className="w-4 h-4 md:w-5 md:h-5 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        theme={theme}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <OrderConfirmation
        isOpen={orderConfirmed}
        onClose={handleCancelOrder}
        items={cartItems}
        theme={theme}
        onConfirmOrder={handleConfirmOrder}
      />

      <Toast
        isVisible={showToast}
        message={toastMessage}
        theme={theme}
        type={toastType}
      />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* THE LANDING SCREEN (HERO) - LOCKED TO DARK PREMIUM AESTHETIC */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-20 relative px-6 bg-[#050505]">
              {/* Premium Shade Texture Overlay - Always Visible on Landing */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-[5] bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

              <motion.div style={{ scale, opacity, y: yBg }} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />
                <img src={heroBgAsset} className="w-full h-full object-cover scale-110" alt="Atmospheric" />
              </motion.div>

              <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center z-10 py-20">
                {/* Left Content - Takes 3 columns */}
                <div className="lg:col-span-3 space-y-12 text-center lg:text-left text-[#F5E6C8]">
                  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="space-y-8">
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <span className="w-12 h-[1px] bg-amber-500 opacity-40" />
                      <span className="text-[9px] uppercase tracking-[0.6em] font-bold text-amber-500">Est. 2026</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.9] tracking-tighter italic uppercase text-white">
                      LUXE CANDLE <br /> EMPORIUM
                    </h2>

                    <p className="text-base md:text-lg font-light opacity-70 leading-relaxed max-w-xl mx-auto lg:mx-0">
                      Where art meets fragrance. Handcrafted candles that transform spaces into sanctuaries of warmth and elegance.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6 pt-4"
                  >
                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Signature Fragrance Notes</p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {[
                        { id: 'vanilla', label: 'Madagascar Vanilla' },
                        { id: 'lavender', label: 'French Lavender' },
                        { id: 'rose', label: 'Damascus Rose' },
                        { id: 'sandalwood', label: 'Indian Sandalwood' }
                      ].map(note => (
                        <motion.button
                          key={note.id}
                          onMouseEnter={() => setActiveNote(note.id)}
                          onMouseLeave={() => setActiveNote(null)}
                          whileHover={{ scale: 1.05 }}
                          className={`px-6 py-3 rounded-full border transition-all flex items-center gap-2 ${activeNote === note.id ? 'bg-amber-600 border-amber-600 text-black scale-105' : 'bg-white/5 border-white/10 text-white/80'}`}
                        >
                          <Circle className={`w-1.5 h-1.5 fill-current ${activeNote === note.id ? 'opacity-100' : 'opacity-30'}`} />
                          <span className="text-[8px] uppercase tracking-[0.3em] font-bold">{note.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="pt-8"
                  >
                    <button
                      onClick={() => setView('store')}
                      className="group inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.6em] font-bold text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      Explore Collection
                      <span className="w-16 h-[1px] bg-amber-500 group-hover:w-32 transition-all duration-700" />
                    </button>
                  </motion.div>
                </div>

                {/* Right Image - Takes 2 columns */}
                <div className="lg:col-span-2 relative flex items-center justify-center pt-8 lg:pt-0">
                  {/* Professional Aesthetic Candle Display (Royal Frame) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-sm group"
                  >
                    {/* Outer Royal Frame */}
                    <div className="relative p-6 rounded-t-[200px] rounded-b-[40px] border-[0.5px] border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 via-black/80 to-black backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.9)] transition-all duration-1000 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_20px_80px_rgba(212,175,55,0.2)] overflow-hidden">

                      {/* Inner Gold Borders - Royal Aesthetic Detail */}
                      <div className="absolute inset-3 border-[0.5px] border-[#D4AF37]/20 rounded-t-[188px] rounded-b-[28px] pointer-events-none transition-colors duration-1000 group-hover:border-[#D4AF37]/40" />
                      <div className="absolute inset-[20px] border border-[#D4AF37]/10 rounded-t-[180px] rounded-b-[20px] pointer-events-none" />

                      {/* Top Diamond Decor */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-[0.5px] border-[#D4AF37]/40 flex items-center justify-center">
                        <div className="w-1 h-1 bg-[#D4AF37]/60" />
                      </div>

                      {/* Background Glow inside frame */}
                      <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[50px] rounded-t-[200px] rounded-b-[40px] opacity-40 group-hover:opacity-80 transition-opacity duration-1000" />

                      {/* Starburst/Texture overlay */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none rounded-t-[200px] rounded-b-[40px]" />

                      {/* Main Image */}
                      <div className="relative z-10 pt-16 pb-8 px-2 flex justify-center">
                        <img
                          src={heroCandleAsset}
                          alt="Handcrafted Luxury Candle"
                          className="w-[90%] h-auto object-contain rounded-[3rem] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-1000 group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:rounded-[4rem] group-hover:drop-shadow-[0_30px_60px_rgba(212,175,55,0.3)] mix-blend-screen relative z-20"
                        />
                        {/* Candle specific backing glow to enhance cut-out */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[40px] rounded-full z-10" />
                      </div>

                      {/* Bottom decorative pedestal line */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 flex items-center gap-2 justify-center opacity-60">
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 shrink-0" />
                        <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
                      </div>
                    </div>

                    {/* Subtle Accent Rings Behind Frame */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 -z-10 flex items-center justify-center opacity-50 pointer-events-none"
                    >
                      <div className="absolute w-[110%] aspect-square border-[0.5px] border-[#D4AF37]/10 rounded-full" />
                      <div className="absolute w-[125%] aspect-square border-[0.5px] border-dashed border-[#D4AF37]/10 rounded-full" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
                className="absolute bottom-10 opacity-40 text-amber-500"
              >
                <ArrowDown className="w-5 h-5" />
              </motion.div>
            </section>

            {/* AESTHETIC FLOATING CANDLE GALLERY */}
            <section className={`py-32 relative overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0a0a0a]' : 'bg-[#FFF8F3]'} border-y border-current/5`}>
              <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-20">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Sparkles className="w-8 h-8 mx-auto mb-6 text-amber-500 opacity-40" />
                    <h3 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-4">Our Handcrafted Candles</h3>
                    <p className="text-sm uppercase tracking-[0.5em] opacity-40 font-bold">Each piece is a work of art</p>
                  </motion.div>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {[
                    { img: bubbleCandle1, name: 'Bubble Candle', delay: 0 },
                    { img: peonyCandle, name: 'Peony Candle', delay: 0.1 },
                    { img: oceanCandle1, name: 'Ocean Candle', delay: 0.2 },
                    { img: icedLatte1, name: 'Iced Latte Candle', delay: 0.3 },
                    { img: daisyBouquet1, name: 'Daisy Bouquet', delay: 0.4 },
                    { img: peonyBouquet1, name: 'Peony Bouquet', delay: 0.5 },
                    { img: champagneCandle1, name: 'Champagne Candle', delay: 0.6 },
                    { img: ladduCandle1, name: 'Laddu Candle', delay: 0.7 },
                    { img: knotBouquet1, name: 'Knot Bouquet', delay: 0.8 }
                  ].map((candle, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: candle.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -12, scale: 1.02 }}
                      className="group relative rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer"
                    >
                      <div className={`aspect-[3/4] relative ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                        <img
                          src={candle.img}
                          alt={candle.name}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                        {/* Name on Hover */}
                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white text-sm font-serif italic">{candle.name}</p>
                          <p className="text-white/60 text-[9px] uppercase tracking-widest font-bold mt-1">View Details</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center mt-20">
                  <button
                    onClick={() => setView('store')}
                    className={`px-12 py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.6em] transition-all shadow-2xl hover:shadow-amber-500/20 active:scale-95 flex items-center gap-4 mx-auto group ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500' : 'bg-stone-900 text-white hover:bg-black'}`}
                  >
                    View Full Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* SUBSEQUENT SECTIONS RESPOND TO THEME TOGGLE */}
            <section className={`py-60 relative overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#0F0F0F]' : 'bg-[#FFF5F0]'}`}>
              <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16">
                  <header className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30">01 / Philosophy</span>
                    <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-none">The Alchemy of <br /> Slow Burn</h2>
                  </header>
                  <div className="space-y-8 text-xl font-light opacity-60 leading-relaxed italic">
                    <p>"We don't just sell candles. We sell the quiet minutes before the world wakes up. We sell the deep exhales at the end of a long day."</p>
                    <p>Each pour is a deliberate act of creation, blending cold-pressed botanicals with our proprietary soy wax blend for a burn that is as clean as it is evocative.</p>
                  </div>
                  <button onClick={() => setView('studio')} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-bold hover:gap-8 transition-all">
                    Inside the Studio <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-8 h-[80vh]">
                  <motion.div whileInView={{ y: [-50, 0] }} className="rounded-[4rem] overflow-hidden shadow-2xl mt-20">
                    <img src={flowerBouquet1} className="w-full h-full object-cover brightness-90" alt="Flower Bouquet Candle" />
                  </motion.div>
                  <motion.div whileInView={{ y: [50, 0] }} className="rounded-[4rem] overflow-hidden shadow-2xl">
                    <img src={knotBouquet1} className="w-full h-full object-cover brightness-90" alt="Knot Bouquet Candle" />
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="py-40 border-y border-current/5">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Collections</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-30">Sorted by form and essence</p>
                  </div>
                  <button onClick={() => setView('store')} className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-60 hover:opacity-100 underline decoration-amber-500 underline-offset-8">Shop All Artisans</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {TAXONOMY.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`group relative h-[600px] rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 hover:flex-[1.5] flex-1`}
                    >
                      <img src={item.image} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-110 transition-all duration-[2s]" alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-x-10 bottom-10 space-y-4 text-white">
                        <div className="p-3 bg-amber-500 rounded-full w-fit text-black">{item.icon}</div>
                        <h3 className="text-3xl font-serif italic">{item.title}</h3>
                        <p className="text-xs font-light opacity-0 group-hover:opacity-60 translate-y-4 group-hover:translate-y-0 transition-all duration-700 italic">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-40 bg-current/5">
              <div className="container mx-auto px-6 lg:px-12 mb-20 text-center">
                <Quote className="w-12 h-12 mx-auto mb-8 opacity-20" />
                <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter">Voices from the Sanctuary</h2>
              </div>
              <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                  animate={{ x: [0, '-50%'] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="flex gap-10"
                >
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-[400px] shrink-0 p-12 rounded-[3rem] border ${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
                      <p className="text-xl font-serif italic leading-relaxed whitespace-normal mb-8">"LUXE CANDLE EMPORIUM transformed my evening ritual. The Basalt & Clove scent is grounding beyond words."</p>
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">— Julian Vane, SF</p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, s) => <Star key={s} className="w-3 h-3 fill-amber-500 text-amber-500" />)}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {view === 'store' && (
          <Store key="store" theme={theme} onBack={() => setView('home')} onAddToCart={addToCart} />
        )}

        {view === 'bestsellers' && (
          <Store key="bestsellers" theme={theme} onBack={() => setView('home')} onAddToCart={addToCart} />
        )}

        {view === 'gifting' && (
          <Gifting key="gifting" theme={theme} onAddToCart={addToCart} />
        )}


        {view === 'journal' && (
          <Journal theme={theme} />
        )}

        {view === 'studio' && (
          <motion.div
            key="studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`pt-40 pb-40 relative transition-colors duration-1000 ${isDark ? 'bg-[#0F0F0F] text-[#F5E6C8]' : 'bg-[#FFF5F0] text-[#2D2D2D]'}`}
          >
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 z-50 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-16">
                  <header className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-[1px] bg-amber-500" />
                      <span className={`text-[10px] uppercase tracking-[0.6em] font-bold ${isDark ? 'text-amber-500' : 'text-stone-500'}`}>02 / Methodology</span>
                    </div>
                    <h2 className="text-6xl md:text-[8rem] font-serif italic tracking-tighter leading-none">The Science <br /> of sanctuary</h2>
                  </header>

                  <div className="space-y-10 text-xl md:text-2xl font-light opacity-60 leading-relaxed italic">
                    <p>Located in the heart of Brooklyn, our atelier operates as a laboratory of light. We spend an average of 180 hours testing the "hot throw" of every new fragrance oil before it earns our artisan seal.</p>

                    <div className="grid grid-cols-2 gap-12 pt-12 border-t border-current/10">
                      <div className="space-y-4">
                        <span className="text-6xl font-serif italic text-amber-500">180h</span>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Burn Validation</p>
                      </div>
                      <div className="space-y-4">
                        <span className="text-6xl font-serif italic text-amber-500">12.2%</span>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Oil Concentration</p>
                      </div>
                    </div>
                  </div>

                  <button className={`px-16 py-8 rounded-full font-bold text-[10px] uppercase tracking-[0.6em] transition-all shadow-2xl active:scale-95 flex items-center gap-4 group ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500' : 'bg-stone-900 text-white hover:bg-black'}`}>
                    Book Studio Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>

                <div className="relative h-[80vh] flex items-center justify-center">
                  <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent blur-3xl animate-pulse" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-[120%] h-[120%] border border-current/5 rounded-full absolute"
                  />
                  <div className="grid grid-cols-2 gap-8 relative z-10 w-full">
                    <motion.div
                      whileHover={{ y: -20 }}
                      className="translate-y-24"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1704628814123-05fbf38955df"
                        className="w-full h-full object-cover rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10" alt="Process"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ y: 20 }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1767034240258-9d2cd1799b95"
                        className="w-full h-full object-cover rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10" alt="Tools"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-60 grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { icon: <Beaker className="w-6 h-6" />, title: "Molecular Precision", desc: "Every scent is built note by note, testing the structural integrity of the fragrance under heat." },
                  { icon: <History className="w-6 h-6" />, title: "Ancestral Methods", desc: "We combine modern safety standards with hand-pouring techniques passed down through generations." },
                  { icon: <Wind className="w-6 h-6" />, title: "Atmospheric Throw", desc: "Our proprietary wax blend ensures a scent radius that fills a room without overwhelming the senses." }
                ].map((item, i) => (
                  <div key={i} className={`p-12 rounded-[3rem] border space-y-6 ${isDark ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
                    <div className="p-4 bg-amber-500/10 rounded-full w-fit text-amber-500">{item.icon}</div>
                    <h4 className="text-2xl font-serif italic">{item.title}</h4>
                    <p className="text-sm font-light opacity-50 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="pt-32 pb-12 border-t border-white/5 bg-[#020202] text-[#F5E6C8] relative overflow-hidden">
        {/* Deep soothing black gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-[#020202] to-[#020202] pointer-events-none" />

        {/* Crystal Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-[1] bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

            {/* Brand & Contact */}
            <div className="space-y-12 lg:col-span-4">
              <div>
                <h2 className="text-3xl font-serif italic tracking-tighter uppercase text-white mb-6">LUXE CANDLE <br /> EMPORIUM</h2>
                <p className="text-sm font-light opacity-50 leading-relaxed max-w-sm">
                  Where art meets fragrance. Handcrafted in Brooklyn, designed to transform spaces into sanctuaries of warmth and elegance.
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-bold">Concierge Service</p>
                <div className="space-y-3 flex flex-col">
                  <a href="tel:+916375821299" className="text-sm font-serif italic opacity-60 hover:opacity-100 hover:text-amber-500 transition-all w-fit">+91 6375 821 299</a>
                  <a href="mailto:luxecandlese@gmail.com" className="text-sm font-serif italic opacity-60 hover:opacity-100 hover:text-amber-500 transition-all w-fit">luxecandlese@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-4 lg:px-8">
              <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <Sparkles className="w-5 h-5 text-amber-500/50 mb-6" />
                  <h3 className="text-xl font-serif italic mb-3 text-white">The Archive</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] leading-relaxed mb-8">Join the sanctuary for private <br /> studio releases & exclusive events.</p>
                  <form className="flex border-b border-white/10 pb-3 focus-within:border-amber-500/50 transition-colors" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Enter your email address" className="bg-transparent border-none outline-none text-xs w-full placeholder:opacity-30 text-white" />
                    <button type="submit" className="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-500 hover:text-amber-400 transition-colors ml-4">Join</button>
                  </form>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-4 flex justify-between lg:justify-end gap-16 lg:gap-24">
              {[
                { title: "The Atelier", links: ["Artisan Boutique", "Brooklyn Studio", "The Journal", "Archive Vol. 1"] },
                { title: "Client Care", links: ["White Glove Shipping", "Bespoke Wholesale", "Vessel Care", "Contact Us"] }
              ].map(col => (
                <div key={col.title} className="space-y-10">
                  <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40">{col.title}</h4>
                  <ul className="space-y-6">
                    {col.links.map(l => (
                      <li key={l}>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-light opacity-50 hover:opacity-100 hover:text-amber-500 transition-all block w-fit relative group">
                          {l}
                          <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-500 group-hover:w-full" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <a href="https://instagram.com/luxe_candles_emporium" target="_blank" rel="noreferrer" aria-label="Instagram" className="group p-3 rounded-full bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
                <Instagram className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-amber-500 transition-colors" />
              </a>
              <a href="mailto:luxecandlese@gmail.com" aria-label="Email" className="group p-3 rounded-full bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
                <Mail className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-amber-500 transition-colors" />
              </a>
              <a href="https://twitter.com/luxecandle" target="_blank" rel="noreferrer" aria-label="Twitter" className="group p-3 rounded-full bg-white/5 hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
                <Twitter className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-amber-500 transition-colors" />
              </a>
            </div>

            <div className="text-center order-first md:order-none">
              <p className="text-[9px] uppercase tracking-[0.6em] opacity-30 font-bold">© 2026 LUXE CANDLE EMPORIUM. BROOKLYN.</p>
            </div>

            <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40 font-light">
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:opacity-100 transition-opacity">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}