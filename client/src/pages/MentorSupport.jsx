import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { User, Send, Phone, UserCheck } from 'lucide-react';
import { io } from 'socket.io-client';

export default function MentorSupport() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mentorAvailable, setMentorAvailable] = useState(false);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to Backend WebSocket
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('mentor_status', (data) => {
      setMentorAvailable(data.available);
    });

    newSocket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, { ...data, sender: 'mentor' }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = { text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    // Add local state immediately for seamless UX
    setMessages((prev) => [...prev, { ...messageData, sender: 'user' }]);
    
    // Broadcast via socket if the backend is actually online and connected
    if (socket && socket.connected) {
      socket.emit('send_message', messageData);
    } else {
      // Offline fallback: Simulated AI Bot Reply
      setTimeout(() => {
        const botResponses = [
          "Our live mentors are currently offline, but I am an automated assistant! How can I help you?",
          "That sounds like an excellent choice. Do you prefer light roasts or dark roasts?",
          "If you're looking for a smooth finish, I highly recommend our single-origin Cold Brew.",
          "Our expert baristas will be back online shortly. Until then, any basic menu questions?"
        ];
        
        let replyText = botResponses[Math.floor(Math.random() * botResponses.length)];
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
           replyText = "Hello there! I'm Havaana's backup AI. How can we elevate your coffee journey today?";
        } else if (lowerInput.includes('recommend') || lowerInput.includes('best')) {
           replyText = "Our signature Iced Caramel Macchiato is a crowd absolute favorite right now. Highly recommended!";
        } else if (lowerInput.includes('brew') || lowerInput.includes('espresso')) {
           replyText = "For excellent home brewing, always remember: grind size and fresh water temperature (around 93°C) are key!";
        }
        
        setMessages((prev) => [...prev, { 
          text: replyText, 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
          sender: 'mentor' 
        }]);
      }, 1200); // simulate realistic typing delay
    }
    
    setInput('');
  };

  const handleCall = () => {
    alert("Initiating secure audio stream to Mentor... (Simulated Option)");
  };

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary mb-4"
        >
          Live Mentor Support
        </motion.h1>
        <p className="text-secondary/80 max-w-xl mx-auto text-lg">Connect securely with expert baristas in real-time to discuss brewing techniques, aesthetic setups, and bean origins.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#2A2A2A] border border-white/5 shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[550px] shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="bg-[#1F1F1F] p-4 md:p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 shadow-inner">
               <User className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Barista Expert</h2>
              <div className="flex items-center gap-2 text-sm mt-1">
                {mentorAvailable ? (
                   <><span className="w-2.5 h-2.5 bg-green-500 border border-green-400/50 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> <span className="text-green-400 font-medium tracking-wide">Mentor Available</span></>
                ) : (
                   <><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> <span className="text-yellow-400 font-medium tracking-wide">Experts Offline <span className="text-white/40">|</span> AI Assistant Ready</span></>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={handleCall}
            className="h-12 w-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-all shadow-lg focus:outline-none hover:shadow-primary/20 hover:scale-105 active:scale-95"
            title="Call Mentor"
          >
            <Phone size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#2A2A2A] to-[#1F1F1F]/50">
           {messages.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                  <UserCheck size={40} className="text-secondary" />
                </div>
                <p className="max-w-xs text-secondary/80">Send a message to instantly sync with our available mentors globally.</p>
             </div>
           ) : (
             messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] p-4 rounded-3xl text-sm leading-relaxed shadow-md ${
                      msg.sender === 'user' 
                      ? 'bg-primary/20 text-white border border-primary/20 rounded-tr-sm shadow-primary/5' 
                      : 'bg-[#1F1F1F] text-secondary border border-white/5 rounded-tl-sm shadow-black/20'
                   }`}>
                     <p>{msg.text}</p>
                     <span className="text-[10px] opacity-40 mt-2 block w-full text-right font-mono tracking-wider">{msg.timestamp}</span>
                   </div>
                </div>
             ))
           )}
           <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 md:p-6 bg-[#1F1F1F] border-t border-white/5 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
           <form onSubmit={sendMessage} className="relative flex items-center">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder={mentorAvailable ? "Write your message to the expert..." : "Message our AI backup assistant..."}
               className="w-full bg-[#2A2A2A] border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"

             />
             <button 
               type="submit"
               disabled={!input.trim()}
               className="absolute right-2 h-11 w-11 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-black shadow-lg shadow-primary/20 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
             >
               <Send size={18} className="ml-1" />
             </button>
           </form>
        </div>
      </motion.div>
    </div>
  );
}
