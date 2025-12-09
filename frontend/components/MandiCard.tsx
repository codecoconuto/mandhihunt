
import React from 'react';
import { Star, MapPin, Utensils, Flame, Navigation, Users } from 'lucide-react';
import { MandiShop, SpiceLevel, CrowdStatus } from '../types';

interface MandiCardProps {
  shop: MandiShop;
  onClick: () => void;
}

const MandiCard: React.FC<MandiCardProps> = ({ shop, onClick }) => {
  
  const handleDirectionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the detail modal
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shop.coordinates.lat},${shop.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getCrowdColor = (status: CrowdStatus) => {
    switch (status) {
      case CrowdStatus.QUIET: return 'bg-green-500/20 text-green-400 border-green-500/30';
      case CrowdStatus.MODERATE: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case CrowdStatus.BUSY: return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case CrowdStatus.VERY_BUSY: return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCrowdText = (status: CrowdStatus) => {
    switch (status) {
      case CrowdStatus.QUIET: return 'Quiet';
      case CrowdStatus.MODERATE: return 'Moderate';
      case CrowdStatus.BUSY: return 'Busy';
      case CrowdStatus.VERY_BUSY: return 'Jam Packed';
      default: return 'Unknown';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-mandi-dark-card border border-mandi-dark-border rounded-2xl overflow-hidden cursor-pointer hover:border-mandi-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-mandi-500/10 flex flex-col h-full relative"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={shop.thumbnailUrl} 
          alt={shop.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10 z-10">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-bold">{shop.rating}</span>
        </div>
        {shop.isOpen ? (
          <div className="absolute top-3 left-3 bg-green-500/90 text-black text-xs font-bold px-2 py-1 rounded-md z-10">
            OPEN
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            CLOSED
          </div>
        )}
      </div>

      {/* Live Heat Indicator */}
      <div className="absolute top-44 right-3 z-10">
         <div className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1 ${getCrowdColor(shop.crowdStatus)}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${shop.crowdStatus === CrowdStatus.VERY_BUSY || shop.crowdStatus === CrowdStatus.BUSY ? 'animate-pulse bg-current' : 'bg-current'}`}></div>
            {getCrowdText(shop.crowdStatus)}
         </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-mandi-400 transition-colors">
            {shop.name}
          </h3>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-400 text-sm overflow-hidden w-full">
            <MapPin size={14} className="mr-1 flex-shrink-0 text-mandi-500" />
            <span className="truncate">{shop.formattedAddress || `${shop.village}, ${shop.district}`}</span>
          </div>
          <button 
            onClick={handleDirectionClick}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-mandi-500 hover:text-black text-gray-400 hover:shadow-lg transition-all border border-white/10 flex-shrink-0 ml-2"
            title="Get Directions"
          >
            <Navigation size={14} />
          </button>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2">
             <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10">
               {shop.priceRange}
             </span>
             <span className={`px-2 py-1 rounded text-xs border flex items-center gap-1 ${
               shop.spiceLevel === SpiceLevel.EXTREME ? 'bg-red-500/20 text-red-400 border-red-500/30' :
               shop.spiceLevel === SpiceLevel.SPICY ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
               'bg-green-500/20 text-green-400 border-green-500/30'
             }`}>
               <Flame size={10} /> {shop.spiceLevel}
             </span>
          </div>
          
          <div className="pt-3 border-t border-white/5">
             <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Signature Dish</div>
             <div className="flex items-center text-mandi-200 text-sm font-medium">
                <Utensils size={14} className="mr-2 text-mandi-500" />
                {shop.signatureDish}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MandiCard;
