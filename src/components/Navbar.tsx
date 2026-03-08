import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC<{ 
  isDark: boolean; 
  toggleTheme: () => void; 
  onOpenStore: () => void;
  onOpenCart: () => void;
  onGoHome: () => void;
  cartCount: number;
}> = ({ isDark, toggleTheme, onOpenStore, onOpenCart, onGoHome, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Store', onClick: onOpenStore },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-in-out px-6 lg:px-12 ${
        isScrolled 
          ? 'py-4 bg-[#fff5f0]/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-orange-100 dark:border-white/5 shadow-sm' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Theme Toggle & Store */}
        <div className="hidden lg:flex items-center gap-8">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-neutral-500 dark:text-neutral-400"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          {navLinks.slice(0, 2).map((link) => (
            link.onClick ? (
              <button
                key={link.name}
                onClick={link.onClick}
                className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-amber-600 uppercase tracking-[0.25em] transition-all duration-300"
              >
                {link.name}
              </button>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-amber-600 uppercase tracking-[0.25em] transition-all duration-300"
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* Center: Logo */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }} 
          className="flex flex-col items-center group cursor-pointer"
        >
          <span className="text-2xl font-serif text-neutral-950 dark:text-white tracking-[0.4em] uppercase transition-all group-hover:text-orange-600">Lumina</span>
          <span className="text-[8px] text-orange-600/60 uppercase tracking-[0.6em] mt-1 group-hover:text-orange-500">Atelier</span>
        </button>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.slice(2).map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-amber-600 uppercase tracking-[0.25em] transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="w-px h-4 bg-neutral-200 dark:bg-white/10 mx-2" />
          <div className="flex items-center gap-5 text-neutral-600 dark:text-white/80">
            <button onClick={onOpenCart} className="hover:text-amber-600 transition-colors relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-4">
          <button onClick={onOpenCart} className="relative text-neutral-600 dark:text-white">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-amber-600 text-[8px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
          <button className="text-neutral-600 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            <AnimatePresence mode="wait">
              {isOpen ? <X key="x" className="w-6 h-6" /> : <Menu key="menu" className="w-6 h-6" />}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 w-full h-screen bg-white dark:bg-neutral-950 z-[90] flex flex-col justify-center items-center gap-10"
          >
            <button onClick={toggleTheme} className="p-4 bg-neutral-100 dark:bg-white/5 rounded-full dark:text-white">
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            {navLinks.map((link, idx) => (
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={() => { link.onClick!(); setIsOpen(false); }}
                  className="text-2xl font-serif text-neutral-800 dark:text-neutral-200 tracking-widest"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-serif text-neutral-800 dark:text-neutral-200 tracking-widest"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
