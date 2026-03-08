import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Mail, ArrowRight, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 text-white py-32 border-t border-white/5 transition-colors duration-700">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif tracking-tighter">
                Lumina <span className="italic text-neutral-500 font-light">Atelier</span>
              </h2>
              <p className="text-neutral-400 font-light text-lg max-w-sm leading-relaxed italic">
                Crafting atmospheric memories through the intersection of artisanal light and botanical essence.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-6 pt-12 border-t border-white/5">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-orange-400">Join the Sanctuary</span>
              <div className="relative group max-w-md">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-b border-white/20 py-4 pr-12 text-sm focus:outline-none focus:border-orange-400 transition-all uppercase tracking-widest placeholder:text-neutral-600"
                />
                <button className="absolute right-0 bottom-4 text-neutral-400 group-hover:text-orange-400 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-500">Navigation</h4>
              <ul className="space-y-4 text-sm font-light text-neutral-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Collections</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">The Process</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Wholesale</a></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-500">Support</h4>
              <ul className="space-y-4 text-sm font-light text-neutral-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Candle Care</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-8 col-span-2 md:col-span-1">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-500">Sanctuary</h4>
              <ul className="space-y-6 text-sm font-light text-neutral-400">
                <li className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                  <span>124 Artisan Alley,<br />Brooklyn, NY 11201</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span>+1 800 LUMINA</span>
                </li>
                <li className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <Instagram className="w-5 h-5 hover:text-orange-400 cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-orange-400 cursor-pointer transition-colors" />
                  <Mail className="w-5 h-5 hover:text-orange-400 cursor-pointer transition-colors" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.5em] text-neutral-600 font-bold">
            © 2026 Lumina Atelier. All Rights Reserved.
          </p>
          <div className="flex gap-12">
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-neutral-600 hover:text-neutral-400 font-bold transition-colors">Privacy</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-neutral-600 hover:text-neutral-400 font-bold transition-colors">Terms</a>
            <a href="#" className="text-[9px] uppercase tracking-[0.4em] text-neutral-600 hover:text-neutral-400 font-bold transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
