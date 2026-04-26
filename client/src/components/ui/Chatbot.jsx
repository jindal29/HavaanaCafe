import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi there! I'm your Havaana Virtual Barista. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getFallbackChatResponse = (inputText) => {
    const text = inputText.toLowerCase();
    
    if (text.includes('menu') || text.includes('order') || text.includes('food')) {
      return "You can browse all our handcrafted beverages and fresh artisan pastries by navigating to the Menu page! Our single-origin pour-overs are to die for.";
    }
    if (text.includes('time') || text.includes('timing') || text.includes('open')) {
      return "Havaana Coffee is vibrantly open from Monday to Saturday: 7:00 AM - 9:00 PM, and on Sundays: 8:00 AM - 6:00 PM.";
    }
    if (text.includes('offer') || text.includes('deal') || text.includes('discount')) {
      return "We have amazing seasonal promotions! Head over to the exclusive Offers tab to grab some premium deals today.";
    }
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hello! I am operating in offline-backup mode, but I am still happy to assist you with any basic cafe queries!";
    }
    if (text.includes('contact') || text.includes('location') || text.includes('where')) {
      return "We are located right in the heart of the city at 123 Coffee Ave, Dreamville. Check our Contact page for maps!";
    }
    
    return "My main server connection is currently offline, so I'm running on a backup brain! Try asking me about our 'Menu', 'Timing', 'Offers', or 'Location'.";
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message immediately to UI
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', { message: text });
      // Add bot response to UI
      setMessages(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error("Chatbot disconnected from backend. Using offline fallback.", error);
      // Wait a moment to simulate real typing, then send the fallback response
      setTimeout(() => {
         const localReply = getFallbackChatResponse(text);
         setMessages(prev => [...prev, { sender: 'bot', text: localReply }]);
         setIsTyping(false);
      }, 800);
      return; // Early return to avoid setting isTyping again
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (actionText) => {
    handleSendMessage(actionText);
  };

  const quickActions = ["Menu", "Timing", "Offers"];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center outline-none"
      >
        <MessageSquare size={28} />
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 flex flex-col bg-[#1F1F1F] border border-white/10 shadow-2xl rounded-2xl overflow-hidden"
            style={{ maxHeight: '70vh', height: '500px' }}
          >
            {/* Header */}
            <div className="bg-[#2A2A2A] px-4 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                  <Bot size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Havaana Support</h3>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm flex gap-2 ${
                    msg.sender === 'user' 
                      ? 'bg-primary/20 text-white rounded-tr-sm border border-primary/20' 
                      : 'bg-[#2A2A2A] text-secondary/90 rounded-tl-sm border border-white/5'
                  }`}>
                    {msg.sender === 'bot' && <Bot size={16} className="text-primary mt-0.5 shrink-0" />}
                    <span>{msg.text}</span>
                    {msg.sender === 'user' && <User size={16} className="text-primary mt-0.5 shrink-0" />}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex justify-start w-full"
                >
                  <div className="bg-[#2A2A2A] text-secondary border border-white/5 rounded-2xl rounded-tl-sm p-3 px-4 flex items-center gap-1.5 h-10">
                    <span className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions / Prompts */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors flex z-10"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-[#1F1F1F] border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-[#2A2A2A] border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 bg-primary text-black rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}} />
    </>
  );
}
