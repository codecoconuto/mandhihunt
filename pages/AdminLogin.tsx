import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Attempt Real Login
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-client-id': 'mandi_hunt_web_client_secret_key_123'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();
      if (data.status === 'success') {
         localStorage.setItem('token', data.token);
         localStorage.setItem('user', JSON.stringify(data.data.user));
         navigate('/admin/dashboard');
         return;
      }
    } catch (err) {
       // Fallback for Demo / Preview Environment
       if (email === 'admin@mandihunt.com' && password === 'admin123') {
           console.warn("Backend unavailable. Logging in as DEMO ADMIN.");
           localStorage.setItem('token', 'demo-token-123');
           localStorage.setItem('user', JSON.stringify({ name: 'Demo Admin', role: 'admin' }));
           navigate('/admin/dashboard');
           return;
       }
       setError('Login Failed. For Demo, use: admin@mandihunt.com / admin123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626202378954-15f5c38676a0?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60"></div>

       <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-mandi-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-mandi-500/20">
                <ShieldCheck size={32} className="text-black" />
             </div>
             <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
             <p className="text-gray-400 text-sm">Restricted Access Only</p>
          </div>

          {error && (
             <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-lg mb-6 text-center animate-pulse">
                {error}
             </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
             <div>
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">Email Address</label>
                <div className="relative">
                   <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                   <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-mandi-500 transition-colors"
                     placeholder="admin@mandihunt.com"
                   />
                </div>
             </div>

             <div>
                <label className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">Password</label>
                <div className="relative">
                   <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                   <input 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-mandi-500 transition-colors"
                     placeholder="••••••••"
                   />
                </div>
             </div>

             <button 
               type="submit" 
               disabled={loading}
               className="w-full bg-mandi-500 hover:bg-mandi-400 text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
             >
                {loading ? "Verifying..." : <>Login Securely <ArrowRight size={18}/></>}
             </button>
          </form>

          <div className="mt-8 text-center">
             <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">Return to Home</a>
          </div>
       </div>
    </div>
  );
};

export default AdminLogin;