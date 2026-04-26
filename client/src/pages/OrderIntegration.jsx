import { motion } from 'framer-motion';
import { ExternalLink, Clock, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

export default function OrderIntegration() {
  const [partnerStatus, setPartnerStatus] = useState({
    zomato: 'Checking status...',
    swiggy: 'Checking status...'
  });

  // Simulate picking up live status API
  useEffect(() => {
    const timer = setTimeout(() => {
      setPartnerStatus({
        zomato: '🟢 Online - Accepting Orders (Wait ~25m)',
        swiggy: '🟢 Online - High Demand (Wait ~35m)'
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full min-h-[80vh]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary mb-6"
        >
          Delivery Partners
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-secondary/80 text-lg"
        >
          Get your favorite Havaana Coffee Roasters handcrafted drinks and pastries delivered directly to your door through our trusted delivery partners.
        </motion.p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-10 flex items-start gap-4 mx-auto max-w-3xl">
        <Info className="text-primary shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-secondary/80">
          <span className="font-semibold text-cafe-text">Tracking Information:</span> Note that live tracking is currently 
          managed natively within the Zomato and Swiggy mobile applications. The statuses below are simulated 
          for demonstration purposes as requested, without using unofficial APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Zomato Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#2A2A2A] rounded-3xl p-8 border border-white/5 relative overflow-hidden group flex flex-col"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -z-10 group-hover:bg-red-500/20 transition-colors" />
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Zomato</h2>
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center border border-red-500/30">
              <span className="text-red-500 font-bold text-xl italic">Z</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1F1F1F] p-4 rounded-xl border border-white/5 mb-8">
            <Clock size={18} className="text-red-400 shrink-0" />
            <div className="text-sm font-medium">
              <p className="text-cafe-text/60 text-xs mb-1 uppercase tracking-wider">Live Status</p>
              <p className={partnerStatus.zomato.includes('Online') ? 'text-green-400' : 'text-secondary/60'}>
                {partnerStatus.zomato}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <a 
              href="https://www.zomato.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/20">
                Order on Zomato <ExternalLink size={18} />
              </button>
            </a>
          </div>
        </motion.div>

        {/* Swiggy Card */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#2A2A2A] rounded-3xl p-8 border border-white/5 relative overflow-hidden group flex flex-col"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -z-10 group-hover:bg-orange-500/20 transition-colors" />
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Swiggy</h2>
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
              <span className="text-orange-500 font-bold text-xl">S</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1F1F1F] p-4 rounded-xl border border-white/5 mb-8">
            <Clock size={18} className="text-orange-400 shrink-0" />
            <div className="text-sm font-medium">
              <p className="text-cafe-text/60 text-xs mb-1 uppercase tracking-wider">Live Status</p>
              <p className={partnerStatus.swiggy.includes('Online') ? 'text-green-400' : 'text-secondary/60'}>
                {partnerStatus.swiggy}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <a 
              href="https://www.swiggy.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20">
                Order on Swiggy <ExternalLink size={18} />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
