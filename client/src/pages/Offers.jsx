import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Gift, Zap, Percent, ArrowRight, Loader2, Star, Tag, Coffee } from 'lucide-react';

const iconMap = {
  "Gift": Gift,
  "Percentage": Percent,
  "Zap": Zap,
  "Star": Star,
  "Tag": Tag,
  "Coffee": Coffee
};

// Pre-compiled Tailwind gradients to prevent dynamic JIT extraction failures
const aestheticGradients = [
  "bg-gradient-to-br from-[#2E1B0F] to-[#4A2C11]",
  "bg-gradient-to-br from-amber-900/80 to-orange-950",
  "bg-gradient-to-br from-stone-900 to-[#191512]",
  "bg-gradient-to-br from-emerald-900/40 to-[#1F2922]",
  "bg-gradient-to-br from-rose-900/40 to-[#2A161A]",
];

const fallbackOffers = [
  {
    _id: "fb1",
    title: "Morning Brew 50% Off",
    description: "Start your day right! Get a 50% discount on any hand-crafted espresso beverage before 10 AM.",
    tag: "Early Bird",
    code: "WAKEUP50",
    iconName: "Coffee",
  },
  {
    _id: "fb2",
    title: "Free Pastry Friday",
    description: "Thank God It's Friday! Enjoy a complimentary freshly baked croissant or muffin with any Venti order.",
    tag: "Weekend Special",
    code: "TGIFFREE",
    iconName: "Gift",
  },
  {
    _id: "fb3",
    title: "Student Discount",
    description: "Fuel your study sessions. Present your valid student ID to our barista and enjoy a flat 15% off all items.",
    tag: "Student",
    code: "STUDY15",
    iconName: "Percentage",
  }
];

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/offers');
        if (data && data.length > 0) {
          setOffers(data);
        } else {
          setOffers(fallbackOffers); // Use aesthetic fallbacks if DB is empty
        }
      } catch (err) {
        console.error("Backend offline or error fetching offers. Using fallbacks.", err);
        setOffers(fallbackOffers); // Gracefully degrade to static UI instead of an ugly error
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative min-h-[80vh]">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
        >
          <Zap size={14} className="fill-primary/50" />
          <span>Limited Time Deals</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-[#EED9C4] to-primary mb-6"
        >
          Exclusive Offers
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-secondary/80 text-lg sm:text-xl"
        >
          Elevate your daily ritual with our curated seasonal promotions and member-only rewards.
        </motion.p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 relative z-10">
          <Loader2 size={48} className="animate-spin text-primary mb-4" />
          <p className="text-secondary/80 animate-pulse tracking-widest text-sm uppercase">Curating deals...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {offers.map((offer, idx) => {
            const Icon = iconMap[offer.iconName] || Star;
            // Safely assign gradient from preset array using index modulo to bypass Tailwind JIT limitations
            const safeGradient = aestheticGradients[idx % aestheticGradients.length];

            return (
              <motion.div
                key={offer._id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-[2rem] p-8 border border-white/10 shadow-2xl flex flex-col justify-between min-h-[380px] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-primary/30 ${safeGradient}`}
              >
                {/* Decorative element background */}
                <div className="absolute -top-12 -right-12 opacity-[0.07] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:opacity-[0.12] group-hover:rotate-12">
                  <Icon size={200} />
                </div>

                <div className="relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-bold tracking-widest text-primary mb-6 uppercase border border-white/5 shadow-inner">
                    {offer.tag || "Special"}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{offer.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-8 font-light">
                    {offer.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex items-center justify-between bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/5 group-hover:border-primary/20 transition-colors shadow-inner">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Use Code</span>
                      <span className="font-mono font-bold text-lg text-primary tracking-widest">{offer.code}</span>
                    </div>
                    <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary transition-all text-white group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
