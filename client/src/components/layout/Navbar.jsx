import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Coffee, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

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
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
              className="bg-primary text-cafe-dark px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all ml-2"
            >
              Order Now
            </Link>

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/5 pl-3 pr-4 py-1.5 rounded-full border border-white/10">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full bg-primary/20" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <UserIcon size={14} className="text-primary" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-white tracking-wide">{user.name?.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white/50 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-black px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
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

              <div className="pt-2">
                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary text-black px-5 py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  Order Now
                </Link>
              </div>
              
              <div className="h-px w-full bg-white/10 my-4"></div>

              {user ? (
                <div className="pt-2 pb-4 px-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-white/10" />
                      ) : (
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex gap-2 items-center justify-center">
                          <UserIcon size={20} className="text-primary" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-white/50 text-xs">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="p-2 border border-white/10 rounded-xl text-white/50 hover:text-red-400 hover:bg-white/5"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center border border-white/10 text-white px-5 py-3 rounded-xl font-medium hover:bg-white/5"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-primary text-black px-5 py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
