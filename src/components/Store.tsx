import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
   ShoppingBag,
   ArrowLeft,
   Sparkles,
   Filter,
   Search,
   Plus,
   Star,
   Wind,
   Droplets,
   Zap,
   ChevronDown,
   LayoutGrid,
   Tally3,
   MessageSquare
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductImageCarousel } from './ProductImageCarousel';
import bubbleCandle1 from 'figma:asset/37c645db17b5ecf1641812eae60dcc749024836f.png';
import bubbleCandle2 from 'figma:asset/6b59032bcaedadce099c6f344dae9bd9bcc7f385.png';
import flowerBouquet1 from 'figma:asset/6f230fbffef67dc7ed09b1535bc790c001a02de5.png';
import flowerBouquet2 from 'figma:asset/35a232d2ec552dfa14722105e37d3d6cefc2dc20.png';
import jarCandle from 'figma:asset/ba095c0d52bdeaae182a0df9f91689e8bacb93e4.png';
import coupleCandle1 from 'figma:asset/c6f4c377b6d560a70246d016d90478745b7b0f9e.png';
import coupleCandle2 from 'figma:asset/8ad527b1983978884cb84c1d4b45c3b545f0221b.png';
import peonyCandle from 'figma:asset/7d9d780091fbbe3c8de325444dbfe13bbbffd8ae.png';
import knotBouquet1 from 'figma:asset/81b1caad13ac4674f07bb48ca5d7ba12d52f9114.png';
import knotBouquet2 from 'figma:asset/748da166db46f03eb2a2febb6ae75025e7c1c577.png';
import knotBouquet3 from 'figma:asset/b09d160bf03c081af18695269bff21267b299b90.png';
import daisyCandle1 from 'figma:asset/efce95a1256b38d831251c4a6e78934210b4f52c.png';
import daisyCandle2 from 'figma:asset/e5096b435847c0f1da98414bd2fe774f6d0ff741.png';
import daisyCandle3 from 'figma:asset/3a81f1cdbc49455b67841d9c9f58196cf4ef056b.png';
import miniBubble1 from 'figma:asset/9af8f469abaca04c235e8287d126f53fe9f3c98b.png';
import miniBubble2 from 'figma:asset/af41c2bcde7b5ccfb762d93168a6926cf6758708.png';
import miniBubble3 from 'figma:asset/77e25cefb8ad6434ca19268b9c0eb54a820ab3f8.png';
import customJar1 from 'figma:asset/706d8a376f4b95aec75f2bee312064094093fccd.png';
import customJar2 from 'figma:asset/1ecf4a8583dd2e89304728a674590967da88a913.png';
import customJar3 from 'figma:asset/9db6cf455496f6e3575c46e9072b231a8805d2e9.png';
import customJar4 from 'figma:asset/795dfd4d659899da381b087aee663cc9b3615637.png';
import oceanCandle1 from 'figma:asset/c0d9c3c974825ada3115f53150a9b6be1a376382.png';
import oceanCandle2 from 'figma:asset/3e539a0f846b2ea9cdd6ecc867bd8021cb432df6.png';
import icedLatte1 from 'figma:asset/33d57ddd7902a4a440a31a1425f590f82a204559.png';
import icedLatte2 from 'figma:asset/0c96c855fe97a5e8348fd3afecee120741459b10.png';
import icedLatte3 from 'figma:asset/330fed620f1778efe80ad4d5dc2f3ee3039828aa.png';
import ladduCandle1 from 'figma:asset/51c28d9bee12628c01b14baa77c24ebc63efc910.png';
import ladduCandle2 from 'figma:asset/7a3bad940a9a05446dba56966712d1e22e5d52f2.png';
import ladduCandle3 from 'figma:asset/6003baa7a3b1a43dd9db8170d7baf393c6cb9f14.png';
import modakCandle1 from 'figma:asset/cd6f8e3b7d04a1388aaaa5a6cffdf6ecb624f0e8.png';
import modakCandle2 from 'figma:asset/924bd063118706d79b73b8606a042f92971ae51e.png';
import modakCandle3 from 'figma:asset/3e7c89280fe3c24afb922c7c00789ee36b507804.png';
import daisyBouquet1 from 'figma:asset/a40dfc2904a131986451fd6c94ec74e024e2c1f5.png';
import daisyBouquet2 from 'figma:asset/9872342658f04146f1c934178e2d1096e1f4b997.png';
import daisyBouquet3 from 'figma:asset/32068fcffff9a8c23315136d41f2b6526232b476.png';
import daisyBouquet4 from 'figma:asset/d59c09bddf1ee66ed3fb5c80a0e716e5123a9d3a.png';
import glassCandle1 from 'figma:asset/e39d5e2513fc99de611810e00f7f442b59da054e.png';
import glassCandle2 from 'figma:asset/05cdbb1e4ae059ef9c7f8a6863ba0f15b015f935.png';
import glassCandle3 from 'figma:asset/5dd7426353115f7d22f7e720d0be4e0cc6b9f8bd.png';
import champagneCandle1 from 'figma:asset/65d14f9ea7c1b190df62615226b294245836027b.png';
import champagneCandle2 from 'figma:asset/9a11f379f0a341ab41fc4ec208b6bf0beda88c70.png';

interface Product {
   id: string;
   name: string;
   price: number;
   currency?: string;
   image: string;
   images?: string[]; // Multiple images for carousel
   type: 'Candle' | 'Perfume' | 'Diffuser';
   category: string;
   scent: string;
   notes: string[];
   fragranceOptions?: string[]; // Available fragrance options for selection
   mood: string;
   details: string; // Burn time for candles, volume for perfumes
   description: string;
   featured?: boolean;
}

const PRODUCTS: Product[] = [
   // 1. BUBBLE CANDLES
   {
      id: 'bubble-candle',
      name: 'Bubble Candle',
      price: 159,
      currency: '₹',
      image: bubbleCandle1,
      images: [bubbleCandle1, bubbleCandle2], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Rose', 'Jasmine', 'Lavender', 'Vanilla', 'Sandalwood'],
      fragranceOptions: ['Rose', 'Jasmine', 'Lavender', 'Vanilla', 'Sandalwood'],
      mood: 'Playful & Cozy',
      details: '40 Hours',
      description: 'Handcrafted bubble candles in stunning pastel hues. Each candle is a unique work of art featuring a mesmerizing bubble texture. Available in multiple colors and fragrances to suit your mood.',
      featured: true
   },
   // 2. PEONY CANDLE
   {
      id: 'peony-candle',
      name: 'Peony Candle',
      price: 199,
      currency: '₹',
      image: peonyCandle,
      images: [peonyCandle], // Single photo as requested
      type: 'Candle',
      category: 'Artisan',
      scent: 'Rose, Lavender, Jasmine',
      notes: ['Rose', 'Lavender', 'Jasmine'],
      mood: 'Romantic & Elegant',
      details: 'Artisan Crafted',
      description: 'Beautiful peony-shaped candle with a delicate blend of rose, lavender, and jasmine. Handcrafted with premium soy wax for a clean, long-lasting burn.',
      featured: true
   },
   // 3. LUXURIOUS JAR CANDLE
   {
      id: 'jar-candle',
      name: 'Luxurious Jar Candle',
      price: 199,
      currency: '₹',
      image: jarCandle,
      type: 'Candle',
      category: 'Signature',
      scent: 'Classic Aromas',
      notes: ['Vanilla Bean', 'Lavender Bliss', 'Caramel'],
      mood: 'Warm & Comforting',
      details: '45 Hours',
      description: 'Elegant amber glass jar candles featuring classic scents. Each candle is hand-poured with premium soy wax and presented in a sophisticated amber vessel. Perfect for creating a cozy atmosphere.',
      featured: false
   },
   // 4. COUPLE CANDLES
   {
      id: 'couple-candle',
      name: 'Couple Candle',
      price: 199,
      currency: '₹',
      image: coupleCandle1,
      images: [coupleCandle1, coupleCandle2], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Romantic & Intimate',
      notes: ['Warm Vanilla', 'Sweet Amber', 'Soft Musk'],
      mood: 'Romantic & Intimate',
      details: '50 Hours',
      description: 'A beautifully sculpted couple candle, symbolizing love and togetherness. Handcrafted with intricate detail, this elegant piece creates a warm, intimate ambiance perfect for romantic evenings and special occasions.',
      featured: false
   },
   // 5. KNOT BOUQUET CANDLE
   {
      id: 'knot-bouquet',
      name: 'Knot Bouquet Candle',
      price: 249,
      currency: '₹',
      image: knotBouquet1,
      images: [knotBouquet1, knotBouquet2, knotBouquet3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Rose', 'Jasmine', 'Lavender', 'Vanilla'],
      fragranceOptions: ['Rose', 'Jasmine', 'Lavender', 'Vanilla'],
      mood: 'Romantic & Luxurious',
      details: 'Artisan Crafted',
      description: 'An exquisite rose bouquet candle featuring intricately sculpted blooms with a handcrafted wax knot. Perfect for special occasions, weddings, or as a luxurious gift. Choose your favorite fragrance.',
      featured: true
   },
   // 6. DAISY CANDLE
   {
      id: 'daisy-pack',
      name: 'Daisy candle (Pack of 2)',
      price: 60,
      currency: '₹',
      image: daisyCandle1,
      images: [daisyCandle1, daisyCandle2, daisyCandle3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Fresh & Cheerful',
      notes: ['Garden Flowers', 'Fresh Petals', 'Sweet Meadow'],
      mood: 'Bright & Uplifting',
      details: 'Pack of 2',
      description: 'Adorable daisy-shaped floating candles in a vibrant rainbow of colors. Handcrafted with intricate petal details, each candle brings joy and whimsy to any space. Perfect for decorative bowls, celebrations, or gifting. Pack of 2 candles.',
      featured: false
   },
   // 7. MINI BUBBLE CANDLES
   {
      id: 'mini-bubble',
      name: 'Mini Bubble Candle',
      price: 49,
      currency: '₹',
      image: miniBubble1,
      images: [miniBubble1, miniBubble2, miniBubble3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Sweet & Delicate',
      notes: ['Soft Vanilla', 'Sweet Cream', 'Gentle Florals'],
      mood: 'Playful & Adorable',
      details: '15 Hours',
      description: 'Tiny bubble candles perfect for gifting or decorating. Available in pastel shades and adorned with charming details like hearts and ribbons. Each mini candle is a delightful work of art that brings warmth and whimsy to any space.',
      featured: false
   },
   // 8. CUSTOMISED JAR CANDLE
   {
      id: 'custom-jar',
      name: 'Customised Jar Candle',
      price: 199,
      currency: '₹',
      image: customJar1,
      images: [customJar1, customJar2, customJar3, customJar4], // Multiple views
      type: 'Candle',
      category: 'Signature',
      scent: 'Multiple Options Available',
      notes: ['Cinnamon', 'Cloves', 'Rose', 'Jasmine', 'Lavender', 'Coffee'],
      fragranceOptions: ['Cinnamon', 'Cloves', 'Rose', 'Jasmine', 'Lavender', 'Coffee'],
      mood: 'Cozy & Customizable',
      details: '40 Hours',
      description: 'Beautifully customised jar candles adorned with natural elements like cinnamon sticks, star anise, coffee beans, rose petals, and dried flowers. Each jar is elegantly wrapped with jute ribbon and can be personalized with your choice of 6 delightful fragrances. Perfect for gifts or creating your signature scent sanctuary.',
      featured: false
   },
   // 9. OCEAN CANDLE
   {
      id: 'ocean-candle',
      name: 'Ocean Candle',
      price: 199,
      currency: '₹',
      image: oceanCandle1,
      images: [oceanCandle1, oceanCandle2], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Sandalwood', 'Rose', 'Lavender'],
      fragranceOptions: ['Sandalwood', 'Rose', 'Lavender'],
      mood: 'Coastal & Tranquil',
      details: 'Gel Artistry',
      description: 'Mesmerizing ocean-inspired gel candles featuring layers of sparkling blue gel resembling tropical waters, adorned with real seashells, starfish, and natural sand. Each candle captures the serene beauty of the seaside. Available in 3 soothing fragrances to transport you to a peaceful beach paradise.',
      featured: false
   },
   // 10. ICED LATTE CANDLE
   {
      id: 'iced-latte',
      name: 'Iced Latte Candle',
      price: 299,
      currency: '₹',
      image: icedLatte1,
      images: [icedLatte1, icedLatte2, icedLatte3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Coffee', 'Strawberry', 'Lavender'],
      fragranceOptions: ['Coffee', 'Strawberry', 'Lavender'],
      mood: 'Cafe Vibes & Cozy',
      details: '35 Hours',
      description: 'Incredibly realistic iced latte candles served in clear glass cups with authentic straw wicks. Each candle features stunning layered gel wax mimicking coffee, milk, and ice. Available in classic coffee, sweet strawberry, and lavender matcha variations. Perfect for coffee lovers and cafe-inspired decor.',
      featured: false
   },
   // 11. LADDU CANDLE
   {
      id: 'laddu-candle',
      name: 'Laddu Candle',
      price: 59,
      currency: '₹',
      image: ladduCandle1,
      images: [ladduCandle1, ladduCandle2, ladduCandle3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Sandalwood',
      notes: ['Rich Sandalwood', 'Warm Spices', 'Traditional Essence'],
      mood: 'Festive & Traditional',
      details: 'Pack of 2',
      description: 'Charming laddu-shaped candles handcrafted to perfection with vibrant orange wax adorned with silver leaf details. Inspired by traditional Indian sweets, these delightful candles feature a realistic textured surface. Perfect for festivals, celebrations, and gifting. Infused with rich sandalwood fragrance.',
      featured: false
   },
   // 12. MODAK CANDLE
   {
      id: 'modak-candle',
      name: 'Modak Candle',
      price: 59,
      currency: '₹',
      image: modakCandle1,
      images: [modakCandle1, modakCandle2, modakCandle3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Sandalwood', 'Kesar'],
      fragranceOptions: ['Sandalwood', 'Kesar'],
      mood: 'Festive & Traditional',
      details: 'Pack of 2',
      description: 'Exquisite modak-shaped candles handcrafted to perfection with creamy ivory wax adorned with delicate gold leaf accents. Inspired by Lord Ganesha\'s favorite sweet, these elegant candles are perfect for festivals, puja ceremonies, and celebrations. Available in 2 divine fragrances: rich sandalwood and precious kesar (saffron).',
      featured: false
   },
   // 13. DAISY BOUQUET CANDLE
   {
      id: 'daisy-bouquet',
      name: 'Daisy Bouquet Candle',
      price: 249,
      currency: '₹',
      image: daisyBouquet1,
      images: [daisyBouquet1, daisyBouquet2], // Purely Daisy
      type: 'Candle',
      category: 'Artisan',
      scent: 'Fresh Florals',
      notes: ['Daisy', 'Wildflower', 'Green Stem'],
      fragranceOptions: ['Rose', 'Jasmine', 'Lavender', 'Vanilla'],
      mood: 'Cheerful & Bright',
      details: 'Artisan Bouquet',
      description: 'Stunning daisy bouquet candles featuring vibrant, handcrafted blooms wrapped in elegant cones. Each bouquet showcases beautifully detailed daisy petals in cheerful colors.',
      featured: false
   },
   // 13b. PEONY BOUQUET CANDLE
   {
      id: 'peony-bouquet',
      name: 'Peony Bouquet Candle',
      price: 299,
      currency: '₹',
      image: flowerBouquet1,
      images: [flowerBouquet1, flowerBouquet2, daisyBouquet3, daisyBouquet4],
      type: 'Candle',
      category: 'Artisan',
      scent: 'Rich Peony',
      notes: ['Peony', 'Damask Rose', 'White Musk'],
      fragranceOptions: ['Rose', 'Jasmine', 'Lavender', 'Vanilla'],
      mood: 'Romantic & Royal',
      details: 'Artisan Bouquet',
      description: 'Exquisite peony bouquet candles featuring lush, full blooms wrapped with luxury artisan precision. Perfect for grand gestures and premium gifting.',
      featured: true
   },
   // 14. GLASS CANDLES
   {
      id: 'glass-candle',
      name: 'Glass Candle',
      price: 59,
      currency: '₹',
      image: glassCandle1,
      images: [glassCandle1, glassCandle2, glassCandle3], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Rose', 'Jasmine', 'Lavender'],
      fragranceOptions: ['Rose', 'Jasmine', 'Lavender'],
      mood: 'Elegant & Serene',
      details: 'Atmospheric',
      description: 'Elegant glass candles in clear holders featuring soft pastel wax in soothing shades. Each candle is hand-poured with a smooth, velvety finish. Perfect for creating a calm, minimalist ambiance in any space. Available in 3 beautiful fragrances.',
      featured: false
   },
   // 15. CHAMPAGNE CANDLES
   {
      id: 'champagne-candle',
      name: 'Champagne Candle',
      price: 299,
      currency: '₹',
      image: champagneCandle1,
      images: [champagneCandle1, champagneCandle2], // Multiple views
      type: 'Candle',
      category: 'Artisan',
      scent: 'Multiple Options Available',
      notes: ['Strawberry', 'Vanilla'],
      fragranceOptions: ['Strawberry', 'Vanilla'],
      mood: 'Celebratory & Luxurious',
      details: '30 Hours',
      description: 'Exquisite champagne flute candles featuring sparkling pink gel wax that mimics the effervescence of fine champagne, topped with fresh strawberries. Served in elegant champagne glasses with realistic bubble effects. Perfect for celebrations, romantic dinners, and special occasions. Available in 2 delightful fragrances.',
      featured: false
   },
   // PERFUMES
   {
      id: 'p1',
      name: 'Velvet Oud Extract',
      price: 185,
      image: 'https://images.unsplash.com/photo-1737920459846-2d0318700658',
      type: 'Perfume',
      category: 'Extrait',
      scent: 'Oud',
      notes: ['Assam Oud', 'Bulgarian Rose', 'Saffron'],
      mood: 'Majestic',
      details: '50ml',
      description: 'A concentrated study in high-altitude oud and velvet rose petals.',
      featured: false
   },
   // DIFFUSERS
   {
      id: 'd1',
      name: 'Ceramic Mist',
      price: 95,
      image: 'https://images.unsplash.com/photo-1729101807924-3446ca9aa480',
      type: 'Diffuser',
      category: 'Home Fragrance',
      scent: 'Clean',
      notes: ['Sea Salt', 'Cotton', 'White Tea'],
      mood: 'Serene',
      details: '200ml',
      description: 'Continuous atmospheric diffusion for the minimalist sanctuary.'
   }
];

interface StoreProps {
   onBack: () => void;
   onAddToCart: (product: any) => void;
   theme: 'dark' | 'light';
}

export const Store: React.FC<StoreProps> = ({ onBack, onAddToCart, theme }) => {
   const [activeType, setActiveType] = useState<'All' | 'Candle' | 'Perfume' | 'Diffuser'>('All');
   const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [selectedFragrance, setSelectedFragrance] = useState<string>('');
   const [customNote, setCustomNote] = useState<string>('');

   const isDark = theme === 'dark';

   const filteredProducts = useMemo(() => {
      return PRODUCTS.filter(p => {
         const matchesType = activeType === 'All' || p.type === activeType;

         // Price filter
         let matchesPrice = true;
         if (priceFilter === 'low') {
            matchesPrice = p.price <= 99;
         } else if (priceFilter === 'medium') {
            matchesPrice = p.price > 99 && p.price <= 199;
         } else if (priceFilter === 'high') {
            matchesPrice = p.price > 199;
         }

         const matchesSearch = searchQuery === '' ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.scent.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
         return matchesType && matchesPrice && matchesSearch;
      });
   }, [activeType, priceFilter, searchQuery]);

   const categories = useMemo(() => {
      const cats = activeType === 'All'
         ? Array.from(new Set(PRODUCTS.map(p => p.category)))
         : Array.from(new Set(PRODUCTS.filter(p => p.type === activeType).map(p => p.category)));
      return ['All', ...cats];
   }, [activeType]);

   const featuredProduct = useMemo(() => {
      const filteredFeatured = filteredProducts.filter(p => p.featured);
      return filteredFeatured.length > 0 ? filteredFeatured[0] : filteredProducts[0];
   }, [filteredProducts]);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className={`min-h-screen pt-24 pb-40 relative transition-colors duration-1000 ${isDark ? 'bg-[#0F0F0F] text-[#F5E6C8]' : 'bg-[#FFF5F0] text-[#2D2D2D]'}`}
      >
         {/* Texture Layer */}
         <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay z-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

         {/* Product Detail Modal */}
         <AnimatePresence>
            {selectedProduct && (
               <>
                  <motion.div
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     onClick={() => setSelectedProduct(null)}
                     className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300]"
                  />
                  <motion.div
                     initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                     transition={{ type: 'spring', damping: 30 }}
                     className={`fixed top-0 right-0 h-full w-full max-w-2xl z-[310] overflow-y-auto ${isDark ? 'bg-[#121212] text-white' : 'bg-white text-stone-900'}`}
                  >
                     <div className="p-8 md:p-16 space-y-12">
                        <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 hover:opacity-100 transition-opacity">
                           <ArrowLeft className="w-4 h-4" /> Close Atelier
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div className="aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                              {selectedProduct.images && selectedProduct.images.length > 1 ? (
                                 <ProductImageCarousel images={selectedProduct.images} productName={selectedProduct.name} />
                              ) : (
                                 <ImageWithFallback src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                              )}
                           </div>
                           <div className="flex flex-col justify-between py-4">
                              <div className="space-y-6">
                                 <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-amber-500">{selectedProduct.type} / {selectedProduct.category}</span>
                                    <h2 className="text-5xl font-serif italic tracking-tighter">{selectedProduct.name}</h2>
                                 </div>
                                 <p className="text-3xl font-serif text-amber-500">{selectedProduct.currency ? selectedProduct.currency : '$'}{selectedProduct.price}</p>
                                 <p className="text-lg font-light opacity-60 leading-relaxed italic">{selectedProduct.description}</p>
                              </div>

                              <div className="space-y-8 pt-8 border-t border-current/10">
                                 {/* Fragrance Selector */}
                                 {selectedProduct.fragranceOptions && selectedProduct.fragranceOptions.length > 0 && (
                                    <div className="space-y-4">
                                       <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">Select Your Fragrance</p>
                                       <div className="relative">
                                          <select
                                             value={selectedFragrance}
                                             onChange={(e) => setSelectedFragrance(e.target.value)}
                                             className={`w-full px-6 py-4 rounded-full text-sm font-serif italic border transition-all appearance-none cursor-pointer ${isDark ? 'bg-[#1a1a1a] border-white/20 text-white hover:border-amber-500' : 'bg-white border-black/20 text-stone-900 hover:border-amber-600'} focus:outline-none focus:border-amber-500`}
                                          >
                                             <option value="" className={isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}>Choose a scent...</option>
                                             {selectedProduct.fragranceOptions.map(fragrance => (
                                                <option key={fragrance} value={fragrance} className={isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}>{fragrance}</option>
                                             ))}
                                          </select>
                                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-40" />
                                       </div>
                                    </div>
                                 )}

                                 <div className={`p-8 rounded-[2.5rem] space-y-6 transition-all duration-500 border ${isDark ? 'bg-white/[0.02] border-white/5 hover:border-amber-500/30' : 'bg-black/[0.02] border-black/5 hover:border-amber-600/30'}`}>
                                    <div className="flex items-center gap-4">
                                       <div className={`p-3 rounded-full ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                                          <MessageSquare className="w-4 h-4 text-amber-500" />
                                       </div>
                                       <div>
                                          <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Personalization Atelier</p>
                                          <p className="text-sm font-serif italic opacity-80">Add your bespoke instructions</p>
                                       </div>
                                    </div>

                                    <textarea
                                       value={customNote}
                                       onChange={(e) => setCustomNote(e.target.value)}
                                       placeholder="e.g., Mention specific colors, packaging preferences, or a short gift message..."
                                       className={`w-full px-6 py-5 rounded-3xl text-sm font-serif italic border transition-all resize-none h-32 ${isDark ? 'bg-black/40 border-white/10 text-white focus:border-amber-500/50' : 'bg-white/40 border-black/10 text-stone-900 focus:border-amber-600/50'} focus:outline-none focus:ring-1 focus:ring-amber-500/20 placeholder:opacity-30`}
                                    />

                                    <div className="flex justify-between items-center px-2">
                                       <p className="text-[8px] uppercase tracking-widest opacity-30 font-bold">Bespoke Request</p>
                                       <p className={`text-[8px] uppercase tracking-widest font-bold ${customNote.length > 500 ? 'text-red-500' : 'opacity-30'}`}>{customNote.length} / 500</p>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                       <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">Profile</p>
                                       <p className="text-xl font-serif italic">{selectedProduct.scent}</p>
                                    </div>
                                    <div className="space-y-2">
                                       <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">{selectedProduct.type === 'Candle' ? 'Collection' : 'Volume'}</p>
                                       <p className="text-xl font-serif italic">{selectedProduct.details}</p>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => {
                                       const productWithDetails = {
                                          ...selectedProduct,
                                          selectedFragrance,
                                          customNote: customNote.trim()
                                       };
                                       onAddToCart(productWithDetails);
                                       setSelectedProduct(null);
                                       setSelectedFragrance('');
                                       setCustomNote('');
                                    }}
                                    disabled={selectedProduct.fragranceOptions && selectedProduct.fragranceOptions.length > 0 && !selectedFragrance}
                                    className={`w-full py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${selectedProduct.fragranceOptions && selectedProduct.fragranceOptions.length > 0 && !selectedFragrance
                                       ? 'opacity-40 cursor-not-allowed bg-gray-500'
                                       : isDark
                                          ? 'bg-amber-600 text-black hover:bg-amber-500'
                                          : 'bg-stone-900 text-white hover:bg-black'
                                       }`}
                                 >
                                    {selectedProduct.fragranceOptions && selectedProduct.fragranceOptions.length > 0 && !selectedFragrance
                                       ? 'Please Select Fragrance'
                                       : 'Add to Sanctuary'} <ShoppingBag className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-8">
                           <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 border-b border-current/10 pb-4">Olfactory Notes</h4>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {selectedProduct.notes.map((note, idx) => (
                                 <div key={note} className="space-y-2">
                                    <span className="text-[9px] uppercase font-bold text-amber-500">0{idx + 1}</span>
                                    <p className="text-lg font-serif italic">{note}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </>
            )}
         </AnimatePresence>

         <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {/* Boutique Header */}
            <header className="mb-16 space-y-4">
               <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-amber-500" />
                  <span className={`text-[10px] uppercase tracking-[0.6em] font-bold ${isDark ? 'text-amber-500' : 'text-stone-500'}`}>The Boutique Atelier</span>
               </div>
               <h1 className="text-3xl md:text-5xl font-serif italic tracking-tighter leading-none">Curated Atmosphere</h1>
            </header>

            {/* Master Navigation & Filters */}
            <div className={`sticky top-24 z-100 mb-24 transition-all duration-500 py-8 border-y ${isDark ? 'bg-[#0F0F0F]/90 border-white/5' : 'bg-[#FFF5F0]/90 border-black/5'} backdrop-blur-2xl px-8 rounded-[2rem] shadow-2xl`}>
               <div className="space-y-6">
                  {/* Top Row - Product Types */}
                  <div className="flex justify-center w-full">
                     {/* Desktop View */}
                     <div className="hidden md:flex gap-3 p-2 rounded-full border border-current/10 bg-current/5">
                        {(['All', 'Candle', 'Perfume', 'Diffuser'] as const).map(type => (
                           <button
                              key={type}
                              onClick={() => { setActiveType(type); setPriceFilter('all'); }}
                              className={`px-8 py-3 rounded-full text-[9px] uppercase tracking-[0.5em] font-bold transition-all ${activeType === type ? (isDark ? 'bg-amber-600 text-black shadow-xl shadow-amber-600/20' : 'bg-stone-900 text-white shadow-xl shadow-black/20') : 'opacity-40 hover:opacity-100'}`}
                           >
                              {type}{type !== 'All' && 's'}
                           </button>
                        ))}
                     </div>
                     {/* Mobile View Dropdown */}
                     <div className="md:hidden w-full relative">
                        <select
                           value={activeType}
                           onChange={(e) => { setActiveType(e.target.value as any); setPriceFilter('all'); }}
                           className={`w-full px-6 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold border appearance-none transition-all cursor-pointer ${isDark ? 'bg-[#1a1a1a] border-white/20 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500' : 'bg-white border-black/20 text-stone-900 focus:border-amber-600 focus:ring-1 focus:ring-amber-600'} outline-none`}
                        >
                           {(['All', 'Candle', 'Perfume', 'Diffuser'] as const).map(type => (
                              <option key={type} value={type} className={isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'}>
                                 {type}{type !== 'All' && 's'}
                              </option>
                           ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                     </div>
                  </div>

                  {/* Bottom Row - Price Filter & Search */}
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                     {/* Price Filter */}
                     <div className="flex items-center gap-4 md:gap-6 w-full lg:w-auto overflow-x-auto hide-scrollbar pb-2 lg:pb-0">
                        <Filter className="w-4 h-4 opacity-30 flex-shrink-0 hidden md:block" />
                        <div className="flex gap-4 md:gap-6 w-full lg:w-auto overflow-x-auto hide-scrollbar snap-x">
                           {[
                              { label: 'All Prices', value: 'all' },
                              { label: 'Under ₹99', value: 'low' },
                              { label: '₹100 - ₹199', value: 'medium' },
                              { label: '₹200+', value: 'high' }
                           ].map(filter => (
                              <button
                                 key={filter.value}
                                 onClick={() => setPriceFilter(filter.value as any)}
                                 className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-all relative py-2 whitespace-nowrap snap-start ${priceFilter === filter.value ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                              >
                                 {filter.label}
                                 {priceFilter === filter.value && <motion.span layoutId="activePriceFilter" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500" />}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Search Bar */}
                     <div className={`flex items-center gap-4 px-6 py-3 rounded-full border w-full lg:w-auto ${isDark ? 'border-white/20 bg-white/10' : 'border-black/20 bg-black/10'} lg:min-w-[280px] shadow-lg`}>
                        <Search className="w-4 h-4 opacity-40" />
                        <input
                           type="text"
                           placeholder="Find your scent..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className={`bg-transparent border-none outline-none text-sm w-full ${isDark ? 'placeholder:text-white/30 text-white' : 'placeholder:text-black/30 text-black'}`}
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Featured Showcase - Removed */}
            {false && featuredProduct && searchQuery === '' && (
               <section className="mb-40">
                  <div className={`relative rounded-[5rem] overflow-hidden min-h-[70vh] flex items-center p-8 md:p-24 group ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                     <div className="absolute inset-0 z-0 overflow-hidden">
                        <ImageWithFallback src={featuredProduct.image} alt="Featured" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]" />
                        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-black/80 via-black/20 to-transparent' : 'bg-gradient-to-r from-white/80 via-white/20 to-transparent'}`} />
                     </div>

                     <div className="relative z-10 max-w-2xl space-y-10">
                        <div className="flex items-center gap-4">
                           <Sparkles className="w-5 h-5 text-amber-500" />
                           <span className="text-[10px] uppercase tracking-[0.6em] font-bold opacity-40">Seasonal Masterpiece</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none">{featuredProduct.name}</h2>
                        <p className="text-xl font-light opacity-60 leading-relaxed italic">{featuredProduct.description}</p>
                        <div className="flex items-center gap-10">
                           <button
                              onClick={() => setSelectedProduct(featuredProduct)}
                              className={`px-12 py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] transition-all active:scale-95 ${isDark ? 'bg-amber-600 text-black' : 'bg-stone-900 text-white'}`}
                           >
                              Experience Scent
                           </button>
                           <p className="text-3xl font-serif">{featuredProduct.currency ? featuredProduct.currency : '$'}{featuredProduct.price}</p>
                        </div>
                     </div>
                  </div>
               </section>
            )}

            {/* Results Info */}
            <div className="mb-12 flex justify-between items-center opacity-40">
               <p className="text-[9px] uppercase tracking-[0.4em] font-bold">{filteredProducts.length} Artisanal Pieces Found</p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32">
               <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                     <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                     >
                        <div className={`aspect-[4/5] rounded-[3.5rem] overflow-hidden relative shadow-2xl transition-all duration-700 ${isDark ? 'bg-stone-900 border border-white/5' : 'bg-white border border-black/5'}`}>
                           {product.images && product.images.length > 1 ? (
                              <ProductImageCarousel images={product.images} productName={product.name} />
                           ) : (
                              <ImageWithFallback
                                 src={product.image}
                                 alt={product.name}
                                 className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110"
                              />
                           )}

                           {/* Subtle Gradient Overlay */}
                           <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-1000`} />

                           {/* Hover Interaction Overlay */}
                           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                              <div className="space-y-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-700">
                                 <div className="flex gap-2">
                                    {product.notes.slice(0, 2).map(n => (
                                       <span key={n} className="text-[8px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 text-white/60">{n}</span>
                                    ))}
                                 </div>
                                 <p className="text-sm font-light text-white/70 italic leading-relaxed line-clamp-3">{product.description}</p>
                                 <div className="flex gap-4">
                                    <button
                                       onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                                       className="flex-1 py-4 rounded-full bg-white text-black text-[9px] uppercase tracking-widest font-bold hover:bg-amber-500 transition-colors"
                                    >
                                       Quick View
                                    </button>
                                    <button
                                       onClick={(e) => {
                                          e.stopPropagation();
                                          product.fragranceOptions && product.fragranceOptions.length > 0 ? setSelectedProduct(product) : onAddToCart(product);
                                       }}
                                       className="p-4 rounded-full border border-white/20 text-white hover:bg-amber-600 hover:border-amber-600 transition-all"
                                    >
                                       <ShoppingBag className="w-5 h-5" />
                                    </button>
                                 </div>
                              </div>
                           </div>

                           {/* Type Badge */}
                           <div className="absolute top-8 left-8">
                              <span className={`text-[8px] uppercase tracking-[0.4em] font-bold px-5 py-2.5 rounded-full border backdrop-blur-md ${isDark ? 'bg-black/50 text-amber-500 border-amber-500/30' : 'bg-white/50 text-stone-800 border-stone-800/20'}`}>
                                 {product.type}
                              </span>
                           </div>
                        </div>

                        <div className="mt-10 flex justify-between items-start px-4">
                           <div className="space-y-3">
                              <h3 className="text-2xl font-serif italic tracking-tight group-hover:text-amber-500 transition-colors">{product.name}</h3>
                              <div className="flex items-center gap-4 opacity-40">
                                 <div className="flex items-center gap-2">
                                    <Wind className="w-3.5 h-3.5" />
                                    <span className="text-[9px] uppercase tracking-widest">{product.scent}</span>
                                 </div>
                                 <div className="w-1 h-1 rounded-full bg-current" />
                                 <span className="text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-40 transition-opacity whitespace-nowrap">{product.details}</span>
                              </div>
                           </div>
                           <p className={`text-2xl font-serif ${isDark ? 'text-amber-500' : 'text-stone-800'}`}>{product.currency ? product.currency : '$'}{product.price}</p>
                        </div>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </div>

            {/* Informational Section */}
            <section className="mt-60 py-40 border-t border-current/5">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
                  {[
                     { icon: <Droplets className="w-8 h-8 text-amber-500" />, title: "Purest Essences", desc: "Sourcing rare botanicals and essential oils with architectural structural integrity." },
                     { icon: <Zap className="w-8 h-8 text-amber-500" />, title: "Precision Pour", desc: "Controlled temperature alchemy ensures consistent fragrance release in every vessel." },
                     { icon: <Sparkles className="w-8 h-8 text-amber-500" />, title: "Permanent Sculpture", desc: "Vessels designed by studio artisans to be repurposed as timeless home artifacts." }
                  ].map((item, i) => (
                     <div key={i} className="space-y-6">
                        <div className="p-4 bg-amber-500/5 rounded-full w-fit">{item.icon}</div>
                        <h4 className="text-3xl font-serif italic tracking-tight">{item.title}</h4>
                        <p className="text-lg font-light opacity-50 leading-relaxed italic">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </section>
         </div>
      </motion.div>
   );
};