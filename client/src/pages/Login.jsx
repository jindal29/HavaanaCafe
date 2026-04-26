import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      login(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post('http://localhost:5001/api/auth/google', {
        idToken: credentialResponse.credential, // The JWT from Google
      });
      login(data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Google authentication failed.");
    }
  };

  return (
    <div className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 w-full min-h-[85vh] flex items-center justify-center relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mx-auto mb-6 shadow-inner">
            <LogIn size={28} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-white/50 text-sm">Sign in to Havaana Coffee to continue your journey.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50 tracking-wide uppercase px-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="barista@havaana.com"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
               <label className="text-xs font-semibold text-white/50 tracking-wide uppercase">Password</label>
               <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-black font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="h-px bg-white/10 flex-1"></div>
          <span className="text-xs text-white/40 uppercase tracking-widest font-semibold flex-shrink-0">Or continue with</span>
          <div className="h-px bg-white/10 flex-1"></div>
        </div>

        <div className="flex justify-center w-full [&>div]:w-full">
          {/* Note: The GoogleLogin button has fixed internal styles, we wrap it to ensure it spans full width if possible */}
           <div className="overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-colors w-full flex justify-center bg-black/20 pb-[1px]">
             <GoogleLogin
               onSuccess={handleGoogleSuccess}
               onError={() => setError("Google Login Failed.")}
               theme="filled_black"
               shape="rectangular"
               size="large"
               text="continue_with"
               width="100%"
             />
           </div>
        </div>

        <p className="text-center text-sm text-white/50 mt-10">
          New to Havaana?{' '}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
