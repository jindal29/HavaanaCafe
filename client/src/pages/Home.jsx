import { motion } from 'framer-motion';
import { ArrowRight, Coffee, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeCoffeeCup from '../components/ui/ThreeCoffeeCup';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 Backdrop-blur-md">
              <Star size={16} className="text-secondary fill-secondary" />
              <span className="text-sm font-medium text-cafe-text/90 tracking-wide">Rated 4.9/5 by Coffee Lovers</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-accent to-secondary">
              Brewed with <br />
              <span className="text-primary drop-shadow-md">Love ☕</span>
            </h1>
            
            <p className="text-lg text-secondary/80 max-w-md leading-relaxed">
              Discover the perfect blend of ethically sourced beans, brewed to absolute perfection in our cozy, aesthetic space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/menu">
                <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
                  View Menu <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/order">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg border border-white/10">
                  <Coffee size={20} className="text-primary" /> Order Now
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* 3D Object Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] flex items-center justify-center -z-0"
          >
             <div className="absolute inset-0 bg-gradient-to-t from-cafe-dark via-transparent to-transparent z-10 pointer-events-none" />
             <ThreeCoffeeCup />
          </motion.div>

        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-cafe-text mb-3">Our Specialties</h2>
            <p className="text-secondary/70">Handcrafted with passion and precision.</p>
          </div>
          <Link to="/menu" className="hidden sm:flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: 'Caramel Macchiato', desc: 'Rich espresso, vanilla syrup, and sweet caramel drizzle.', price: '$5.50' },
            { title: 'Havaana Cold Brew', desc: 'Steeped for 18 hours for a smooth, bold flavor profile.', price: '$4.75' },
            { title: 'Pistachio Latte', desc: 'Earthy pistachio paired with creamy oat milk and espresso.', price: '$6.00' }
          ].map((item, idx) => (
             <Card key={idx} delay={idx * 0.1}>
               <div className="h-48 w-full bg-[#1F1F1F] rounded-2xl mb-6 flex items-center justify-center shadow-inner border border-white/5">
                 <Coffee size={48} className="text-primary/50" />
               </div>
               <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-bold text-cafe-text">{item.title}</h3>
                 <span className="text-accent font-semibold">{item.price}</span>
               </div>
               <p className="text-secondary/60 text-sm">{item.desc}</p>
             </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cafe-text mb-3">What Our Guests Say</h2>
          <p className="text-secondary/70">Real stories from our coffee lovers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Jenkins",
              role: "Local Artist",
              text: "The aesthetic here is unmatched. It feels like a second home, and their Cold Brew is legitimately the best I've ever had.",
              rating: 5
            },
            {
              name: "David Chen",
              role: "Software Engineer",
              text: "I come here to work every Tuesday. The ambiance, the warm lighting, and the Pistachio Latte make coding actually enjoyable.",
              rating: 5
            },
            {
              name: "Emily R.",
              role: "Food Blogger",
              text: "Brewed with love is not just a tagline, you can taste the passion in every cup. Also, the croissants are perfectly flaky!",
              rating: 4
            }
          ].map((testimonial, idx) => (
            <Card key={idx} delay={idx * 0.15} className="flex flex-col bg-[#2A2A2A] border-white/5">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "text-accent fill-accent" : "text-white/20"} 
                  />
                ))}
              </div>
              <p className="text-secondary/80 italic mb-6 flex-grow">"{testimonial.text}"</p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-cafe-text text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-secondary/60">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
