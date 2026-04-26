const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const MenuItem = require('./models/MenuItem');
const Offer = require('./models/Offer');

dotenv.config();

connectDB();

const mockMenuData = [
  {
    name: 'Classic Espresso',
    description: 'A double shot of our signature blend, delivering a bold and rich flavor profile.',
    price: 3.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Vanilla Bean Latte',
    description: 'Espresso mixed with steamed milk and Madagascar vanilla bean syrup, topped with light foam.',
    price: 5.25,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Havaana Cold Brew',
    description: 'Slow-steeped for 18 hours. Smooth, intense, and perfectly chilled.',
    price: 4.75,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Butter Croissant',
    description: 'Flaky, buttery perfection baked fresh every morning from authentic French pastry dough.',
    price: 3.75,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Avocado Toast',
    description: 'Smashed avocado on artisan sourdough topped with microgreens and a dash of chili flakes.',
    price: 8.50,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert made of ladyfingers dipped in coffee, layered with a whipped mascarpone mixture.',
    price: 6.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571115177098-24de35c1b681?q=80&w=600&auto=format&fit=crop'
  },
  {
    name: 'Matcha Cheesecake',
    description: 'Creamy New York style cheesecake infused with premium ceremonial grade matcha.',
    price: 7.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop'
  }
];

const mockOfferData = [
  {
    title: "Buy 1 Get 1 Free",
    description: "Every Tuesday, pick any two handcrafted espresso beverages and only pay for one.",
    tag: "Weekly Special",
    code: "TUESDAYBOGO",
    iconName: "Gift",
    bgGradient: "bg-gradient-to-br from-primary/80 to-cafe-dark"
  },
  {
    title: "20% Off Pastries",
    description: "Pair your morning coffee with any of our freshly baked croissants or muffins.",
    tag: "Morning Boost",
    code: "MORNING20",
    iconName: "Percentage",
    bgGradient: "bg-gradient-to-br from-secondary/40 to-cafe-dark"
  },
  {
    title: "Havaana Loyalty",
    description: "Join our rewards program. Earn stars on every purchase and get free drinks.",
    tag: "Rewards",
    code: "JOIN NOW",
    iconName: "Zap",
    bgGradient: "bg-gradient-to-br from-[#2E1B0F] to-cafe-dark"
  }
];

const importData = async () => {
  try {
    await MenuItem.deleteMany();
    await Offer.deleteMany();
    console.log('Existing Data Removed');

    await MenuItem.insertMany(mockMenuData);
    await Offer.insertMany(mockOfferData);
    console.log('Mock Data Successfully Added!');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
