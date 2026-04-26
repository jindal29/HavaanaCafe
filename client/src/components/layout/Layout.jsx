import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../ui/Chatbot';

// Premium page transition variants using custom easing
const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }, // Apple-style spring ease
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-cafe-dark text-cafe-text">
      <Navbar />
      <main className="flex-grow pt-20"> {/* pt-20 to account for fixed navbar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="h-full flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
