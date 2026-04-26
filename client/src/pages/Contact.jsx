import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ type: 'success', message: 'Your message has been sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary mb-6"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-secondary/80 text-lg"
        >
          Have a question or want to reserve a table? We'd love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact Info & Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-cafe-text border-b border-white/10 pb-4">Contact Information</h3>
            
            <div className="flex items-start gap-4 text-secondary/80">
              <MapPin className="text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-cafe-text">Havaana Coffee Roasters</p>
                <p>123 Coffee Ave, Dreamville, CA 90210</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-secondary/80">
              <Phone className="text-primary shrink-0" />
              <p>+1 (555) 123-4567</p>
            </div>
            
            <div className="flex items-center gap-4 text-secondary/80">
              <Mail className="text-primary shrink-0" />
              <p>hello@havaanacoffee.com</p>
            </div>
            
            <div className="flex items-start gap-4 text-secondary/80">
              <Clock className="text-primary mt-1 shrink-0" />
              <div>
                <p className="font-medium text-cafe-text">Opening Hours</p>
                <p>Mon - Fri: 7:00 AM - 8:00 PM</p>
                <p>Sat - Sun: 8:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Google Maps Integration */}
          <div className="relative w-full h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-inner group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043701!2d-118.2436849!3d34.0522342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648fa1d4803%3A0xdec27bf11f9fd336!2s123%20Los%20Angeles%20St%2C%20Los%20Angeles%2C%20CA%2090012!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(80%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Cafe Location Map"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl" />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-[#2A2A2A] p-8 md:p-10 rounded-3xl shadow-xl border border-white/5 space-y-6">
            <h3 className="text-2xl font-bold text-cafe-text mb-2">Send a Message</h3>
            <p className="text-sm text-secondary/60 mb-6">Fill out the form below and we will get back to you shortly.</p>
            
            {status.message && (
              <div className={`p-4 rounded-xl text-sm ${status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                {status.message}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-cafe-text/80 ml-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-white/10 rounded-xl px-4 py-3 text-cafe-text placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-cafe-text/80 ml-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-white/10 rounded-xl px-4 py-3 text-cafe-text placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-cafe-text/80 ml-1">Your Message</label>
              <textarea 
                id="message" 
                rows="4" 
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#1F1F1F] border border-white/10 rounded-xl px-4 py-3 text-cafe-text placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <Button variant="primary" className="w-full mt-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (
                <span className="flex items-center justify-center">Send Message <Send size={18} className="ml-2 inline" /></span>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
