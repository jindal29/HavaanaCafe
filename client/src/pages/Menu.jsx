import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Card from '../components/ui/Card';
import { Plus, Search, Loader2, ArrowDownUp } from 'lucide-react';
import Button from '../components/ui/Button';

// Robust offline fallback data with localized prices (INR)
const fallbackMenu = [
  {
    _id: "m1",
    name: "Classic Espresso",
    description: "Rich, full-bodied espresso with a velvety crema.",
    price: 150,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m2",
    name: "Cappuccino",
    description: "Espresso topped with perfectly steamed milk foam.",
    price: 220,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m3",
    name: "Iced Caramel Macchiato",
    description: "Freshly roasted espresso, vanilla, milk and ice, topped with caramel drizzle.",
    price: 280,
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m4",
    name: "Butter Croissant",
    description: "Flaky, buttery perfection baked fresh every morning.",
    price: 120,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m5",
    name: "Avocado Toast",
    description: "Mashed avocado on artisanal sourdough with chili flakes.",
    price: 350,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m6",
    name: "Tiramisu",
    description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.",
    price: 320,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m7",
    name: "Blueberry Muffin",
    description: "Moist muffin bursting with fresh seasonal blueberries.",
    price: 160,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800"
  },
  {
    _id: "m8",
    name: "Grilled Cheese Paneer Sandwich",
    description: "Spiced paneer filling grilled to crispy perfection.",
    price: 250,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('featured'); // 'featured', 'price-low', 'price-high'
  
  // Static categories matching seed data
  const categories = ['All', 'Coffee', 'Snacks', 'Desserts'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/menu');
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(fallbackMenu);
        }
      } catch (err) {
        console.error("Backend offline, using local fallback menu.");
        setItems(fallbackMenu);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    // Basic toast/console mock for now
    alert(`Added ${item.name} to cart!`);
  };

  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'price-low') return a.price - b.price;
      if (sortOrder === 'price-high') return b.price - a.price;
      return 0; // featured defaults to API natural order
    });

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full min-h-[80vh]">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-white mb-6"
        >
          Our Menu
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-secondary/80 text-lg"
        >
          Explore our carefully curated selection of handcrafted beverages and fresh pastries. 
        </motion.p>
      </div>

      {/* Controls: Search, Sort, & Filters */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-12 bg-white/5 p-4 rounded-3xl border border-white/10 shadow-lg backdrop-blur-md">
        
        {/* Search */}
        <div className="relative w-full xl:w-96 flex-shrink-0">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Search menu..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-cafe-text placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors hover:border-white/20"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center flex-grow">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                  : 'bg-[#1A1A1A] text-white/70 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-full sm:w-auto flex-shrink-0 flex items-center gap-3">
          <ArrowDownUp size={18} className="text-white/40 hidden sm:block" />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full sm:w-[160px] bg-[#1A1A1A] border border-white/10 rounded-2xl px-4 py-3 text-sm text-cafe-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer hover:border-white/20"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Data display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 size={48} className="animate-spin text-primary mb-4" />
          <p className="text-secondary/80 animate-pulse">Brewing up the menu...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-[#1A1A1A] rounded-3xl border border-white/5">
          <p className="text-secondary/80 text-lg">No items found matching your filters. Try adjusting your search!</p>
          <button 
             onClick={() => {setSearchTerm(''); setActiveCategory('All');}} 
             className="mt-6 text-primary hover:underline"
          >
             Reset Filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
                className="h-full"
              >
                <Card delay={0} className="flex flex-col h-full bg-[#1A1A1A] border border-white/5 p-4 overflow-hidden group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className="relative h-56 w-full rounded-2xl mb-5 overflow-hidden border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" }} // Image fallback
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Price Tag INR */}
                    <div className="absolute bottom-3 right-3 text-black font-bold bg-primary px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
                      ₹{item.price.toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col px-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow font-light">{item.description}</p>
                    
                    <Button variant="secondary" className="w-full py-3 text-sm font-semibold tracking-wide border border-white/10 bg-white/5 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 rounded-xl" onClick={() => handleAddToCart(item)}>
                      <Plus size={16} /> Add to Order
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
