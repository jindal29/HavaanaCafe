import { Coffee, Instagram, Twitter, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-cafe-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary">
              <Coffee size={28} />
              <span className="font-bold text-xl tracking-tighter text-cafe-text">Havaana</span>
            </Link>
            <p className="text-sm text-secondary/80 mt-4 leading-relaxed">
              Experience the perfect blend of cozy ambiance and premium coffee. Crafted with love, served with passion.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-cafe-text mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Menu', 'Offers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-secondary/80 hover:text-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-cafe-text mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary/80 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>123 Coffee Ave, Dreamville, CA 90210</span>
              </li>
              <li className="flex items-center gap-3 text-secondary/80 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-secondary/80 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span>hello@havaanacoffee.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-cafe-text mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-secondary/60">
            &copy; {new Date().getFullYear()} Havaana Coffee. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-secondary/60 hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-secondary/60 hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
