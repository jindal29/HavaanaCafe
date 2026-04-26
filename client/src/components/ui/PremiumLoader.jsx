import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export default function PremiumLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cafe-dark bg-opacity-90 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-2 border-primary/20 border-t-primary border-r-primary"
          />
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <Coffee size={28} className="text-secondary" />
          </div>
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm font-medium tracking-widest text-primary uppercase"
        >
          Brewing...
        </motion.p>
      </motion.div>
    </div>
  );
}
