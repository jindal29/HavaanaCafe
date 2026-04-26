import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle2, ShieldCheck, XCircle, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import axios from 'axios';

// Helper function to load Razorpay SDK dynamically
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Payment() {
  const [status, setStatus] = useState('idle'); // 'idle', 'processing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Dummy order context for summary
  const cart = [
    { id: 1, name: 'Havaana Cold Brew', size: 'Grande', price: 4.75, quantity: 2 },
    { id: 2, name: 'Butter Croissant', size: 'Regular', price: 3.50, quantity: 1 }
  ];
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + tax;

  const displayRazorpay = async (e) => {
    e.preventDefault();
    setStatus('processing');
    setErrorMessage('');
    
    // Load checking SDK dynamically
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      setErrorMessage("Razorpay SDK failed to load. Are you online?");
      setStatus('error');
      return;
    }

    try {
      // Create new order on backend
      const result = await axios.post("http://localhost:5001/api/payment/create-order", {
        amount: totalAmount,
      });

      if (!result || !result.data) {
        setErrorMessage("Server error. Please check if the backend is running.");
        setStatus('error');
        return;
      }

      // Extract details from backend response
      const { amount, id: order_id, currency } = result.data.order;
      const key = result.data.key; // Dynamic key extraction

      const options = {
        key: key, 
        amount: amount.toString(),
        currency: currency,
        name: "Havaana Coffee Roasters",
        description: "Payment for Menu Order",
        order_id: order_id,
        handler: async function (response) {
          try {
            // Send back to server to authenticate the signature
            const verifyResult = await axios.post("http://localhost:5001/api/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResult.data.success) {
              setStatus('success');
            } else {
              setErrorMessage("Payment verification failed.");
              setStatus('error');
            }
          } catch (err) {
             console.error("Verification error", err);
             setErrorMessage("Error verifying payment.");
             setStatus('error');
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Havaana Cafe - Order #8472",
        },
        theme: {
          color: "#d4af37", // Cafe aesthetic primary color
        },
      };

      const paymentObject = new window.Razorpay(options);
      
      // Handle modal closes or failures gracefully
      paymentObject.on('payment.failed', function (response) {
         console.error(response.error);
         setErrorMessage(response.error.description || "Payment failed");
         setStatus("error");
      });

      paymentObject.open();

      // Ensure processing state is removed immediately since SDK modal opens
      setStatus('idle'); 

    } catch (err) {
      console.error(err);
      setErrorMessage("Could not initialize order. Please check the network or backend connection.");
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#2A2A2A] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30"
          >
            <CheckCircle2 size={48} className="text-green-500" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Payment Successful!</h2>
          <p className="text-secondary/80 mb-8 leading-relaxed">
            Your payment has been securely verified. The barista is preparing your aesthetic coffee experience right away!
          </p>
          <Link to="/">
            <Button variant="primary" className="w-full py-4 text-lg">Return to Home</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      
      {/* Visual Order Summary */}
      <div className="lg:col-span-2 order-2 lg:order-1">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#2A2A2A] rounded-[2rem] p-6 lg:p-8 border border-white/5 shadow-xl sticky top-24"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <ShoppingBag size={24} className="text-secondary" />
            <h3 className="text-xl font-bold text-cafe-text">Order Summary</h3>
          </div>

          <div className="space-y-4 mb-6 list-none border-b border-white/10 pb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-white font-medium">{item.name} <span className="text-secondary/60 ml-1">x{item.quantity}</span></span>
                  <span className="text-secondary/60">{item.size}</span>
                </div>
                <span className="font-semibold text-secondary/90">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6 list-none border-b border-white/10 pb-6 text-sm">
            <div className="flex justify-between text-secondary/80">
              <span>Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-secondary/80">
              <span>Estimated Tax (8%)</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <span className="font-medium text-secondary">Total</span>
            <span className="text-2xl font-bold text-accent">${totalAmount.toFixed(2)}</span>
          </div>
        </motion.div>
      </div>

      {/* Razorpay Call To Action */}
      <div className="lg:col-span-3 order-1 lg:order-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#2A2A2A] rounded-[2rem] p-8 lg:p-10 border border-white/5 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-bl-full -z-10 pointer-events-none" />
          
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 mb-6 border border-primary/30 text-primary">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Secure Checkout</h2>
            <p className="text-secondary/70 max-w-sm mx-auto leading-relaxed">
              We've partnered with Razorpay to provide secure, seamless, and lightning-fast transactions. 
            </p>
          </div>

          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
              <XCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
              <div className="text-sm">
                <p className="text-red-400 font-medium">Payment Error</p>
                <p className="text-red-300/80">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="bg-[#1F1F1F] p-6 rounded-2xl border border-white/10 mb-8 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-secondary/60 mb-2 uppercase tracking-widest font-medium">Amount Due</p>
            <p className="text-5xl font-black text-accent tracking-tighter">${totalAmount.toFixed(2)}</p>
          </div>

          <Button 
            onClick={displayRazorpay} 
            variant="primary" 
            className="w-full py-5 text-lg font-bold shadow-xl shadow-primary/20 flex flex-col gap-1 items-center justify-center"
            disabled={status === 'processing'}
          >
            {status === 'processing' ? (
              'Initializing Secure Connection...'
            ) : (
              <>
                <span>Pay Later or UPI / Cards</span>
                <span className="text-xs font-normal text-black/60 capitalize tracking-wide flex items-center gap-1.5"><Lock size={12}/> Secured by Razorpay</span>
              </>
            )}
          </Button>
          
          <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
           {/* Abstract representations of payment providers supported by Razorpay wrapper */}
           <div className="h-8 w-12 bg-white/10 rounded-md flex items-center justify-center text-[10px] font-bold">UPI</div>
           <div className="h-8 w-12 bg-white/10 rounded-md flex items-center justify-center"><CreditCard size={16}/></div>
           <div className="h-8 w-12 bg-white/10 rounded-md flex items-center justify-center text-[10px] font-bold">NET</div>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
