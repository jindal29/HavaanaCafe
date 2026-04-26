import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  type = 'button',
  ...props 
}) {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-colors shadow-md inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary shadow-primary/20 hover:shadow-primary/40",
    secondary: "bg-white/10 text-cafe-text hover:bg-white/20 backdrop-blur-md shadow-black/10",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
