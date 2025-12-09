import React, { useState } from 'react';
import Hero from '../components/Hero';
import MandiCard from '../components/MandiCard';
import MandiDetail from '../components/MandiDetail';
import MapView from '../components/MapView';
import Footer from '../components/Footer';
import MandiOracle from '../components/MandiOracle';
import MandiCalculator from '../components/MandiCalculator';
import RestaurantOwnerCTA from '../components/RestaurantOwnerCTA';
import { searchMandiShops } from '../services/geminiService';
import { SearchState } from '../types';
import { Map, List, Coffee, Calculator, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
    error: null,
    selectedShop: null,
    viewMode: 'list'
  });
  
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleSearch = async (query: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, query }));
    
    try {
      const shops = await searchMandiShops(query);
      if (shops.length === 0) {
          setState(prev => ({ 
              ...prev, 
              isLoading: false, 
              error: "No Mandi shops found near this location. Try a major city name like 'Kochi' or 'Malappuram'." 
          }));
      } else {
          setState(prev => ({ ...prev, isLoading: false, results: shops }));
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to hunt down Mandi spots. Please check your connection or API key." 
      }));
    }
  };

  const clearSearch = () => {
    setState({
      query: '',
      results: [],
      isLoading: false,
      error: null,
      selectedShop: null,
      viewMode: 'list'
    });
  };

  return (
    <div className="min-h-screen bg-mandi-dark-bg text-white flex flex-col font-sans selection:bg-mandi-500 selection:text-black relative">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-mandi-dark-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div onClick={clearSearch} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mandi-400 to-mandi-600 flex items-center justify-center group-hover:rotate-12 transition-transform">
               <Coffee className="text-black" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">Mandi<span className="text-mandi-500">Hunt</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setIsCalculatorOpen(true)} className="p-2 text-gray-400 hover:text-mandi-500 transition-colors" title="Calculator">
              <Calculator size={22} />
            </button>
            <button onClick={() => navigate('/admin/login')} className="p-2 text-gray-400 hover:text-white transition-colors" title="Admin Login">
              <LogIn size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {state.results.length === 0 && !state.isLoading && !state.error ? (
          <Hero 
            onSearch={handleSearch} 
            isLoading={state.isLoading} 
            onSelectShop={(shop) => setState(prev => ({ ...prev, selectedShop: shop }))}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-[60vh]">
            {!state.isLoading && (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    Results for <span className="text-mandi-500 capitalize underline decoration-wavy decoration-mandi-500/30 underline-offset-4">{state.query}</span>
                  </h2>
                  <p className="text-gray-400 mt-2 text-lg">Found {state.results.length} premium spots.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    <button 
                      onClick={() => setState(prev => ({ ...prev, viewMode: 'list' }))}
                      className={`p-2 rounded-md transition-all flex items-center gap-2 ${state.viewMode === 'list' ? 'bg-mandi-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      <List size={18} /> <span className="text-xs font-bold uppercase hidden sm:inline">List</span>
                    </button>
                    <button 
                      onClick={() => setState(prev => ({ ...prev, viewMode: 'map' }))}
                      className={`p-2 rounded-md transition-all flex items-center gap-2 ${state.viewMode === 'map' ? 'bg-mandi-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                      <Map size={18} /> <span className="text-xs font-bold uppercase hidden sm:inline">Map</span>
                    </button>
                  </div>
                  <button onClick={clearSearch} className="px-4 py-2 text-sm font-medium text-gray-300 bg-white/5 rounded-full hover:bg-white/10 border border-white/10">Try Another Location</button>
                </div>
              </div>
            )}

            {state.isLoading ? (
               <div className="flex flex-col items-center justify-center h-[50vh]">
                 <div className="w-16 h-16 border-4 border-white/10 border-t-mandi-500 rounded-full animate-spin"></div>
               </div>
            ) : (
              <>
                {state.viewMode === 'list' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    {state.results.map((shop) => (
                      <MandiCard key={shop.id} shop={shop} onClick={() => setState(prev => ({ ...prev, selectedShop: shop }))} />
                    ))}
                  </div>
                ) : (
                  <MapView shops={state.results} onMarkerClick={(shop) => setState(prev => ({ ...prev, selectedShop: shop }))} />
                )}
              </>
            )}

            {state.error && (
              <div className="mt-8 p-8 bg-red-500/5 border border-red-500/20 text-red-200 rounded-3xl text-center max-w-2xl mx-auto">
                {state.error}
              </div>
            )}
          </div>
        )}
      </main>

      <MandiOracle />
      {isCalculatorOpen && <MandiCalculator onClose={() => setIsCalculatorOpen(false)} />}
      <RestaurantOwnerCTA />
      <Footer />
      {state.selectedShop && <MandiDetail shop={state.selectedShop} onClose={() => setState(prev => ({ ...prev, selectedShop: null }))} />}
    </div>
  );
};

export default Home;