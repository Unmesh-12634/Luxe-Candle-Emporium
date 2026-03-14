import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Package, Sparkles, X, CreditCard, Wallet, Building2, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import logoAsset from 'figma:asset/2d1a7c1e0e0ba214033ec10afd82a134f3bad7c3.png';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  theme: 'dark' | 'light';
  onConfirmOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ isOpen, onClose, items, theme, onConfirmOrder }) => {
  const isDark = theme === 'dark';
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const [step, setStep] = useState<'payment' | 'confirmed'>('payment');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    upiId: ''
  });

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-07a9f9cd/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
          total,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          paymentMethod
        })
      });

      if (!response.ok) {
        throw new Error('Failed to complete order.');
      }

      const data = await response.json();
      setOrderNumber(data.orderId.split('_')[2].toUpperCase());

      setStep('confirmed');
      setTimeout(() => {
        onConfirmOrder();
      }, 5000);
    } catch (err) {
      console.error("Payment Error:", err);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (step === 'confirmed') {
      onConfirmOrder();
    } else {
      onClose();
    }
    setStep('payment');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      cardNumber: '',
      upiId: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[400]"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[410] flex items-center justify-center p-4"
          >
            <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3rem] overflow-hidden shadow-2xl ${isDark ? 'bg-[#1A1A1A] text-white' : 'bg-white text-stone-900'}`}>
              {/* Close Button */}
              <button
                onClick={handleClose}
                className={`absolute top-8 right-8 p-3 rounded-full transition-all z-10 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}
              >
                <X className="w-5 h-5" />
              </button>

              {step === 'payment' ? (
                // Payment Step
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className={`pb-6 mb-6 border-b ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                    <div className="flex items-center gap-4 mb-2">
                      <img src={logoAsset} alt="Luxe Candle Emporium" className={`h-16 w-auto object-contain transition-all duration-500 ${isDark ? 'invert brightness-125' : 'contrast-125'}`} />
                      <h2 className="text-2xl md:text-3xl font-serif italic tracking-tight hidden sm:block">Complete Your Order</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Order Summary */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-4">Order Summary</p>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
                            >
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-serif italic text-sm truncate">{item.name}</h4>
                                <p className="text-xs opacity-60">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-amber-500 font-serif flex-shrink-0">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-6 rounded-2xl ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-100/50 border border-amber-600/20'}`}>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-bold uppercase tracking-widest">Total Amount</p>
                          <p className="text-3xl font-serif italic text-amber-500">₹{total}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Payment & Details */}
                    <div className="space-y-6">
                      {/* Customer Details */}
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Shipping Details</p>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-amber-500/50' : 'bg-black/5 border-black/10 focus:border-amber-500'}`}
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-amber-500/50' : 'bg-black/5 border-black/10 focus:border-amber-500'}`}
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-amber-500/50' : 'bg-black/5 border-black/10 focus:border-amber-500'}`}
                        />
                        <textarea
                          placeholder="Shipping Address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${isDark ? 'bg-white/5 border-white/10 focus:border-amber-500/50' : 'bg-black/5 border-black/10 focus:border-amber-500'}`}
                        />
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">Payment Method</p>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => setPaymentMethod('card')}
                            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'card' ? (isDark ? 'bg-amber-500/20 border-amber-500' : 'bg-amber-100 border-amber-600') : (isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10')}`}
                          >
                            <CreditCard className="w-5 h-5" />
                            <span className="text-[8px] uppercase font-bold">Card</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('upi')}
                            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'upi' ? (isDark ? 'bg-amber-500/20 border-amber-500' : 'bg-amber-100 border-amber-600') : (isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10')}`}
                          >
                            <Wallet className="w-5 h-5" />
                            <span className="text-[8px] uppercase font-bold">UPI</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('cod')}
                            className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'cod' ? (isDark ? 'bg-amber-500/20 border-amber-500' : 'bg-amber-100 border-amber-600') : (isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10')}`}
                          >
                            <Building2 className="w-5 h-5" />
                            <span className="text-[8px] uppercase font-bold">COD</span>
                          </button>
                        </div>

                        {paymentMethod === 'card' && (
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-amber-500/50' : 'bg-black/5 border-black/10 focus:border-amber-500'}`}
                          />
                        )}

                        {paymentMethod === 'upi' && (
                          <input
                            type="text"
                            placeholder="UPI ID (e.g., yourname@upi)"
                            value={formData.upiId}
                            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-amber-500/50' : 'bg-black/5 border-black/10 focus:border-amber-500'}`}
                          />
                        )}

                        {paymentMethod === 'cod' && (
                          <div className={`p-4 rounded-xl text-sm ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                            <p className="opacity-60 italic">Pay when you receive your order</p>
                          </div>
                        )}
                      </div>

                      {/* Confirm Button */}
                      <button
                        onClick={handleConfirmPayment}
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.address}
                        className={`w-full py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500' : 'bg-stone-900 text-white hover:bg-black'}`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : paymentMethod === 'cod' ? 'Place Order' : 'Pay ₹' + total}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Success Step
                <>
                  {/* Success Animation */}
                  <div className={`relative py-16 px-8 text-center border-b ${isDark ? 'bg-gradient-to-br from-amber-900/20 to-transparent border-white/5' : 'bg-gradient-to-br from-amber-100/50 to-transparent border-black/5'}`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl shadow-green-500/30 mb-6"
                    >
                      <CheckCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <h2 className="text-4xl md:text-5xl font-serif italic tracking-tight">Order Confirmed!</h2>
                        <Sparkles className="w-5 h-5 text-amber-500" />
                      </div>
                      <p className="text-lg opacity-60 font-light italic max-w-md mx-auto">
                        Thank you for your order! Your handcrafted treasures are being prepared with utmost care.
                      </p>
                    </motion.div>

                    {/* Decorative particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -50] }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 1.5 }}
                        className="absolute"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: '50%',
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-amber-500" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="p-8 md:p-12 space-y-8">
                    {/* Order Number */}
                    <div className="flex items-center justify-between pb-6 border-b border-current/10">
                      <div className="flex items-center gap-4">
                        <Package className="w-6 h-6 text-amber-500" />
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">Order Number</p>
                          <p className="text-xl font-serif italic mt-1">#{orderNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold opacity-40">Total Paid</p>
                        <p className="text-2xl font-serif italic mt-1 text-amber-500">₹{total}</p>
                      </div>
                    </div>

                    {/* Message */}
                    <div className={`p-6 rounded-2xl text-center ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-100/50 border border-amber-600/20'}`}>
                      <p className="text-sm font-light leading-relaxed italic">
                        A confirmation email has been sent to <strong>{formData.email}</strong>. Your artisan candles will be carefully handcrafted and shipped to you within 3-5 business days.
                      </p>
                    </div>

                    {/* Continue Shopping Button */}
                    <button
                      onClick={handleClose}
                      className={`w-full py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.5em] transition-all ${isDark ? 'bg-amber-600 text-black hover:bg-amber-500' : 'bg-stone-900 text-white hover:bg-black'} shadow-lg`}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};