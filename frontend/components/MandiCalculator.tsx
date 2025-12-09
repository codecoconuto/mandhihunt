import React, { useState } from 'react';
import { X, Calculator, Utensils, Users } from 'lucide-react';

interface CalculatorProps {
  onClose: () => void;
}

const MandiCalculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [people, setPeople] = useState(4);
  const [appetite, setAppetite] = useState<'normal' | 'heavy' | 'monster'>('heavy');
  
  // Calculation Logic (Approximate)
  const calculateOrder = () => {
    let riceKg = 0;
    let chickenPieces = 0;
    
    // Base Calculation: Normal eater eats 1/4 Mandi. Heavy eats 1/3 or 1/2.
    // Full Mandi usually has 4 pcs chicken and enough rice for 4 normals.
    
    if (appetite === 'normal') {
       // 4 people = 1 Full Mandi
       chickenPieces = people;
       riceKg = people * 0.25; // 250g per person approx
    } else if (appetite === 'heavy') {
       // 3 people = 1 Full Mandi
       chickenPieces = people;
       riceKg = people * 0.35; // 350g per person
    } else {
       // Monster: 2 people = 1 Full Mandi
       chickenPieces = people * 1.5;
       riceKg = people * 0.5; // 500g per person
    }

    const fullMandis = Math.floor(chickenPieces / 4);
    const extraQuarters = Math.ceil(chickenPieces % 4);
    
    return { fullMandis, extraQuarters, riceKg: riceKg.toFixed(1) };
  };

  const result = calculateOrder();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-zinc-900 w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-mandi-600 to-amber-700 p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center text-white">
                <Calculator size={24} />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white">The Mandi Calculator</h2>
                <p className="text-white/70 text-sm">Al-Hisaab (The Account)</p>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
           
           {/* Slider for People */}
           <div>
              <div className="flex justify-between mb-2">
                 <label className="text-gray-400 text-sm font-bold uppercase tracking-wider">Squad Size</label>
                 <span className="text-mandi-500 font-bold text-lg">{people} Persons</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={people} 
                onChange={(e) => setPeople(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-mandi-500"
              />
           </div>

           {/* Appetite Selector */}
           <div>
              <label className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3 block">Hunger Level</label>
              <div className="grid grid-cols-3 gap-2">
                 <button 
                   onClick={() => setAppetite('normal')}
                   className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${appetite === 'normal' ? 'bg-mandi-500 border-mandi-500 text-black' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                 >
                    <Users size={20} />
                    <span className="text-xs font-bold">Normal</span>
                 </button>
                 <button 
                   onClick={() => setAppetite('heavy')}
                   className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${appetite === 'heavy' ? 'bg-mandi-500 border-mandi-500 text-black' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                 >
                    <Utensils size={20} />
                    <span className="text-xs font-bold">Heavy</span>
                 </button>
                 <button 
                   onClick={() => setAppetite('monster')}
                   className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${appetite === 'monster' ? 'bg-mandi-500 border-mandi-500 text-black' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                 >
                    <span className="text-xl">🦖</span>
                    <span className="text-xs font-bold">Monster</span>
                 </button>
              </div>
           </div>

           {/* Result Card */}
           <div className="bg-black/40 rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-4">You Should Order</div>
              
              <div className="flex items-center justify-center gap-6">
                 {result.fullMandis > 0 && (
                   <div>
                      <div className="text-4xl font-bold text-white mb-1">{result.fullMandis}</div>
                      <div className="text-sm text-mandi-500 font-bold">Full Mandi</div>
                   </div>
                 )}
                 {result.fullMandis > 0 && result.extraQuarters > 0 && (
                    <div className="text-gray-600 text-2xl font-light">+</div>
                 )}
                 {result.extraQuarters > 0 && (
                   <div>
                      <div className="text-4xl font-bold text-white mb-1">{result.extraQuarters}</div>
                      <div className="text-sm text-mandi-500 font-bold">Quarter Pcs</div>
                   </div>
                 )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                 Approx {result.riceKg}kg of rice needed. <br/>
                 (Don't forget extra Mayonnaise!)
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default MandiCalculator;