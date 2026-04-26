import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, delay = 0 }) {
  const hoverStyles = hover ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20" : "";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`bg-[#2A2A2A] rounded-3xl p-6 shadow-lg shadow-black/10 border border-white/5 transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
