import React from 'react';
import { X, Trophy, Flame, MapPin, Utensils, Award, Crown } from 'lucide-react';

interface MandiPassportProps {
  onClose: () => void;
}

const MandiPassport: React.FC<MandiPassportProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-600/20 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-mandi-500/20 rounded-full blur-3xl"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="p-8 relative z-10">
          
          {/* Header ID Card Style */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 mb-4 shadow-lg shadow-amber-500/20">
               <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  <span className="text-4xl">👳🏾‍♂️</span>
               </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
               <h2 className="text-2xl font-bold text-white tracking-tight">Mandi Hunter</h2>
               <Crown size={20} className="text-yellow-400 fill-yellow-400" />
            </div>
            <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-bold tracking-widest uppercase">
              Level 5 • Foodie Elite
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                <Utensils size={18} className="text-gray-400 mb-2" />
                <div className="text-xl font-bold text-white">42</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Plates</div>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-mandi-500/10 group-hover:bg-mandi-500/20 transition-colors"></div>
                <Flame size={18} className="text-mandi-500 mb-2" />
                <div className="text-xl font-bold text-mandi-500">High</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Spice Tol.</div>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
                <MapPin size={18} className="text-gray-400 mb-2" />
                <div className="text-xl font-bold text-white">12</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold">Districts</div>
             </div>
          </div>

          {/* Badges Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Earned Badges</h3>
              <span className="text-xs text-mandi-500 font-medium">View All</span>
            </div>
            
            <div className="space-y-3">
               {/* Badge 1 */}
               <div className="flex items-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/5 p-3 rounded-2xl group hover:border-amber-500/30 transition-colors">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                     🌶️
                  </div>
                  <div>
                     <div className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">Spice Survivor</div>
                     <div className="text-xs text-gray-500">Ate 'Extreme' spice 3 times</div>
                  </div>
               </div>

               {/* Badge 2 */}
               <div className="flex items-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/5 p-3 rounded-2xl group hover:border-amber-500/30 transition-colors">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                     🔦
                  </div>
                  <div>
                     <div className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">Night Owl</div>
                     <div className="text-xs text-gray-500">Ordered Mandi after 11 PM</div>
                  </div>
               </div>

               {/* Badge 3 */}
               <div className="flex items-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-white/5 p-3 rounded-2xl opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                     👑
                  </div>
                  <div>
                     <div className="font-bold text-white text-sm">Malabar King</div>
                     <div className="text-xs text-gray-500">Visit 5 shops in Malappuram</div>
                  </div>
                  <div className="ml-auto text-xs font-bold text-gray-600 bg-black/20 px-2 py-1 rounded">LOCKED</div>
               </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 font-mono">ID: MH-KRL-2024-8832</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MandiPassport;