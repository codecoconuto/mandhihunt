import React from 'react';
import { Store, ArrowRight, CheckCircle2 } from 'lucide-react';

const RestaurantOwnerCTA: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-b from-black to-zinc-900 border-t border-white/10 relative overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mandi-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative group hover:border-mandi-500/30 transition-colors duration-500">
          
          {/* Content */}
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mandi-500/10 text-mandi-500 text-xs font-bold uppercase tracking-widest mb-6 border border-mandi-500/20">
               <Store size={14} /> For Restaurant Owners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Own a Legendary <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mandi-400 to-amber-600">Mandi Spot?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Don't let your "Signature Madghout" remain a secret. Join Kerala's fastest-growing food discovery network. 
              Get discovered by Gen Z foodies who take their rice seriously.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-transform hover:-translate-y-1 shadow-xl">
                List My Restaurant <ArrowRight size={18} />
              </button>
              <button className="bg-transparent border border-white/20 text-white hover:bg-white/5 font-semibold py-4 px-8 rounded-xl flex items-center justify-center transition-colors">
                Contact Sales
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-500">
               <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Instant Listing</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Verified Badge</span>
               <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Analytics Dashboard</span>
            </div>
          </div>

          {/* Visual / Image */}
          <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto h-64 md:h-full flex items-center justify-center">
             <div className="absolute inset-0 bg-gradient-to-br from-mandi-500/20 to-transparent rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl border border-white/10 -rotate-3 group-hover:-rotate-2 transition-transform duration-500 flex items-center justify-center">
                <div className="text-center p-6">
                   <div className="text-5xl font-bold text-white mb-2">10k+</div>
                   <div className="text-gray-400 text-sm uppercase tracking-wider">Hungry Users Daily</div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RestaurantOwnerCTA;