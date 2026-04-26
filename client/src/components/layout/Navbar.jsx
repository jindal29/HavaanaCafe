import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Offers', path: '/offers' },
  { name: 'Contact', path: '/contact' },
  { name: 'Mentor', path: '/mentor' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cafe-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
            <Coffee size={32} />
            <span className="font-bold text-2xl tracking-tighter text-cafe-text">Havaana</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent tracking-wide ${
                  location.pathname === link.path ? 'text-accent' : 'text-cafe-text/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/order"
              className="bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-secondary transition-all shadow-md shadow-primary/20 hover:shadow-primary/40"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-cafe-dark border-b border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-white/5 text-accent'
                      : 'text-white/70 hover:bg-white/5 hover:text-accent'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary text-white px-5 py-3 rounded-xl font-medium hover:bg-secondary"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
