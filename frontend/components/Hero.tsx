import React, { useState } from 'react';
import { Search, MapPin, Flame, Utensils, Zap, Users, ArrowRight, Dices, Radio, Navigation, TrendingUp, TrendingDown } from 'lucide-react';
import { MandiShop } from '../types';
import MandiCard from './MandiCard';
import { getShopsByCoordinates } from '../services/geminiService';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  onSelectShop: (shop: MandiShop) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading, onSelectShop }) => {
  const [input, setInput] = useState('');
  const [nearbyShops, setNearbyShops] = useState<MandiShop[]>([]);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  const handleSurpriseMe = () => {
    const cravings = ["Peri Peri Mandi Kochi", "Beef Mandi Malappuram", "Madghout Kozhikode", "Honey Alfaham Kannur", "Kuzhimanthi Thrissur"];
    const random = cravings[Math.floor(Math.random() * cravings.length)];
    setInput(random);
    onSearch(random);
  }

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const shops = await getShopsByCoordinates(latitude, longitude);
          setNearbyShops(shops);
        } catch (err) {
          setLocationError("Failed to fetch nearby shops. Try searching manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocationError("Permission denied or location unavailable.");
      }
    );
  };

  // Visual Category Data
  const categories = [
    { name: "Kuzhimanthi", img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=200", query: "Best Kuzhimanthi Kerala" },
    { name: "Peri Peri", img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=200", query: "Peri Peri Alfaham Mandi" },
    { name: "Beef Mandi", img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=200", query: "Juicy Beef Mandi" },
    { name: "Madghout", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=200", query: "Authentic Madghout" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: MAIN HERO */}
      <div className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden border-b border-white/5 pb-12">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1596627581163-99990e4399e7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-mandi-dark-bg/30 via-mandi-dark-bg/90 to-mandi-dark-bg"></div>
          
          {/* Abstract Blobs */}
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-mandi-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] animate-float"></div>
        </div>

        <div className="z-10 w-full max-w-4xl flex flex-col items-center pt-10">
          
          <div className="animate-in fade-in slide-in-from-top-10 duration-700">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-mandi-500/10 border border-mandi-500/20 text-mandi-400 text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-mandi-500 animate-ping"></span>
              Kerala's #1 Mandi Discovery App
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-[0.9] animate-in fade-in zoom-in-95 duration-700 delay-100 drop-shadow-2xl uppercase">
            Aliyaa... <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mandi-400 via-mandi-500 to-amber-600">Oru Mandi Pidichalo?</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
             Vayaru kaali aanel scene aanu. Nammude naattile ettavum <b>'Pwoli'</b> Mandi spots ivide und. <br className="hidden md:block"/>
             No Dry Rice. Only Vibes. No Udayipp.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto relative group animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 z-20">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <MapPin className="text-gray-400 group-focus-within:text-mandi-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 text-white text-lg rounded-full py-5 pl-14 pr-16 focus:outline-none focus:border-mandi-500/50 focus:bg-white/10 transition-all shadow-2xl placeholder:text-gray-600"
              placeholder="Try 'Beef Mandi' or 'Edappally'..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 bg-mandi-500 hover:bg-mandi-400 text-black font-bold rounded-full h-12 w-12 flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search size={22} />
              )}
            </button>
          </form>

          {/* Near Me Button */}
          <div className="mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <button
              onClick={handleNearMe}
              disabled={isLocating}
              className="flex items-center gap-2 text-sm text-mandi-500 hover:text-white transition-colors font-semibold"
            >
              {isLocating ? (
                <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div> Finding location...</span>
              ) : (
                <span className="flex items-center gap-2"><Navigation size={14} className="fill-current" /> Use my current location</span>
              )}
            </button>
            {locationError && <p className="text-red-400 text-xs mt-2">{locationError}</p>}
          </div>
          
          {/* OR Divider with Surprise Button */}
          <div className="flex items-center gap-4 mt-8 mb-8 animate-in fade-in delay-500">
             <div className="h-px bg-white/10 w-12"></div>
             <button 
               type="button"
               onClick={handleSurpriseMe}
               className="text-xs text-gray-400 hover:text-mandi-400 transition-colors flex items-center gap-1 uppercase tracking-wide font-bold"
             >
               <Dices size={14} /> Bhagyam Pareekshikko (Spin It)
             </button>
             <div className="h-px bg-white/10 w-12"></div>
          </div>

          {/* Visual Cravings Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 w-full max-w-3xl">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => { setInput(cat.query); onSearch(cat.query); }}
                className="group cursor-pointer flex flex-col items-center gap-3"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border-2 border-transparent group-hover:border-mandi-500 transition-all relative">
                   <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                   </div>
                </div>
                <span className="text-gray-400 text-sm font-medium group-hover:text-white transition-colors uppercase tracking-wide">{cat.name}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Live Feed Ticker */}
        <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-md border-t border-white/5 py-3 overflow-hidden flex items-center">
           <div className="bg-mandi-500 text-black text-[10px] font-bold px-2 py-0.5 ml-4 rounded uppercase tracking-wider flex-shrink-0 z-10 flex items-center gap-1">
             <Radio size={10} className="animate-pulse" /> Live
           </div>
           <div className="whitespace-nowrap flex animate-marquee items-center">
              {[
                "Fahad just rated Nahdi Kuzhimanthi 5 stars ⭐",
                "New 'Honey Glazed Alfaham' spot found in Kannur 🔥",
                "Trending: 120 people searching for Mandi in Malappuram 📈",
                "Spice Alert: Arabian Palace just dropped a 'Dynamite Mandi' 🌶️",
                "Rahul found a hidden gem in Fort Kochi 💎",
                "Fahad just rated Nahdi Kuzhimanthi 5 stars ⭐",
                "New 'Honey Glazed Alfaham' spot found in Kannur 🔥",
                "Trending: 120 people searching for Mandi in Malappuram 📈",
              ].map((text, i) => (
                <span key={i} className="mx-8 text-sm text-gray-400 flex items-center gap-2">
                   <span className="w-1 h-1 rounded-full bg-mandi-500"></span> {text}
                </span>
              ))}
           </div>
        </div>
      </div>

      {/* SECTION 1.5: NEAR ME RESULTS (CONDITIONAL) */}
      {nearbyShops.length > 0 && (
        <div className="py-12 bg-white/5 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <MapPin className="text-mandi-500" /> Near You
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {nearbyShops.map((shop) => (
                <div key={shop.id} className="min-w-[300px] md:min-w-[350px] snap-center">
                  <MandiCard shop={shop} onClick={() => onSelectShop(shop)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1.75: UNEXPECTED FEATURE - THE MANDI STOCK EXCHANGE */}
      <div className="w-full py-20 bg-black overflow-hidden relative border-b border-white/10">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div>
                   <span className="text-mandi-500 font-mono text-xs font-bold tracking-widest uppercase mb-2 block">Live Market Watch</span>
                   <h2 className="text-4xl md:text-5xl font-black text-white leading-none uppercase italic">
                      The Mandi <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Stock Exchange</span>
                   </h2>
                </div>
                <div className="text-right">
                   <p className="text-gray-500 max-w-sm ml-auto text-sm">
                      Real-time analysis of what Kerala is eating right now. 
                      Invest your appetite wisely.
                   </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Stock Card 1: BULLISH */}
               <div 
                 onClick={() => { setInput("Honey Glazed Alfaham"); onSearch("Honey Glazed Alfaham"); }}
                 className="group cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-green-500/50 p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <TrendingUp size={80} className="text-green-500" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                     <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <TrendingUp size={12} /> Bull Market
                     </div>
                     <span className="text-green-400 font-mono font-bold">+24.5%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">Honey Glazed Alfaham</h3>
                  <div className="text-gray-500 text-xs mb-4">Ticker: HNY-ALF</div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-green-500 h-full w-[85%]"></div>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 font-mono">High Demand in Kannur Region</div>
               </div>

               {/* Stock Card 2: STABLE */}
               <div 
                 onClick={() => { setInput("Chicken Kuzhimanthi"); onSearch("Chicken Kuzhimanthi"); }}
                 className="group cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-mandi-500/50 p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <Utensils size={80} className="text-mandi-500" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                     <div className="bg-mandi-500/10 text-mandi-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-mandi-500"></div> Stable
                     </div>
                     <span className="text-mandi-400 font-mono font-bold">+1.2%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-mandi-400 transition-colors">Classic Kuzhimanthi</h3>
                  <div className="text-gray-500 text-xs mb-4">Ticker: KZ-MAN</div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-mandi-500 h-full w-[60%]"></div>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 font-mono">Consistent volume across Kerala</div>
               </div>

               {/* Stock Card 3: BEARISH */}
               <div 
                 onClick={() => { setInput("Shawarma Plate"); onSearch("Shawarma Plate"); }}
                 className="group cursor-pointer bg-zinc-900 border border-zinc-800 hover:border-red-500/50 p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                     <TrendingDown size={80} className="text-red-500" />
                  </div>
                  <div className="flex justify-between items-start mb-4">
                     <div className="bg-red-500/10 text-red-500 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <TrendingDown size={12} /> Bear Market
                     </div>
                     <span className="text-red-400 font-mono font-bold">-12.8%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">Regular Shawarma</h3>
                  <div className="text-gray-500 text-xs mb-4">Ticker: SHW-PLT</div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-red-500 h-full w-[30%]"></div>
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500 font-mono">Volume dropped. Investors moving to Alfaham.</div>
               </div>
            </div>
         </div>
      </div>

      {/* SECTION 2: BENTO GRID FEATURES */}
      <div className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why MandiHunt?</h2>
          <p className="text-gray-400">Because life is too short for average Al-Faham.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Utensils size={150} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-mandi-500/20 rounded-xl flex items-center justify-center mb-6 text-mandi-500">
                <Utensils size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Signature Dish Spotter</h3>
              <p className="text-gray-400 max-w-md">
                Don't guess what to order. We highlight the ONE dish every shop is famous for. 
                Whether it's Peri Peri Alfaham or Honey Glazed, you'll know.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-mandi-900/20 border border-mandi-500/20 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-mandi-500/20 rounded-full blur-xl group-hover:bg-mandi-500/30 transition-colors"></div>
            <div className="w-12 h-12 bg-mandi-500 rounded-xl flex items-center justify-center mb-6 text-black">
              <Flame size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Spice Meter</h3>
            <p className="text-gray-400">
              Visual spice guides so you know if you need extra mayonnaise before you order.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
             <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
                <Zap size={24} />
              </div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Powered</h3>
            <p className="text-gray-400">
              Our GenAI engine finds hidden gems that aren't even listed properly on maps yet.
            </p>
          </div>

          {/* Card 4 */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-gray-900 to-gray-800 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-400">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Community Vetted</h3>
                <p className="text-gray-400">
                  Real portion sizes. Real prices. Real reviews from local foodies who take their Mandi seriously.
                </p>
             </div>
             <div className="w-full md:w-1/3 aspect-video bg-black/50 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-mono z-10">Coming Soon: Leaderboards</span>
                </div>
                {/* Fake chart/graph */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-500/10 to-transparent"></div>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE VIBE / IMAGES */}
      <div className="w-full bg-black py-24 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">The Mandi Culture</h2>
            <p className="text-gray-400">It's not just food. It's an emotion.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-mandi-500 font-bold hover:text-white transition-colors">
            View Gallery <ArrowRight size={18} />
          </button>
        </div>
        
        {/* Horizontal Scroll Snap */}
        <div className="flex gap-4 overflow-x-auto pb-8 px-4 snap-x md:justify-center scrollbar-hide">
          {[
            { img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800', title: 'Kuzhimanthi' },
            { img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800', title: 'Al Faham' },
            { img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800', title: 'Madghout' },
            { img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800', title: 'Majboos' },
          ].map((item, i) => (
             <div key={i} className="snap-center shrink-0 w-72 md:w-80 h-96 relative rounded-2xl overflow-hidden group border border-white/10">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Hero;