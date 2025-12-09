
import React from 'react';
import { X, Phone, Share2, Map, Star, Award, Clock, Navigation, Users } from 'lucide-react';
import { MandiShop, CrowdStatus } from '../types';

interface MandiDetailProps {
  shop: MandiShop;
  onClose: () => void;
}

const MandiDetail: React.FC<MandiDetailProps> = ({ shop, onClose }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Check out ${shop.name} on MandiHunt`,
        text: `Found this amazing Mandi spot: ${shop.name} in ${shop.village}. Famous for ${shop.signatureDish}!`,
        url: window.location.href
      });
    }
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shop.coordinates.lat},${shop.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const getCrowdMeterWidth = (status: CrowdStatus) => {
    switch (status) {
      case CrowdStatus.QUIET: return 'w-1/4 bg-green-500';
      case CrowdStatus.MODERATE: return 'w-2/4 bg-yellow-500';
      case CrowdStatus.BUSY: return 'w-3/4 bg-orange-500';
      case CrowdStatus.VERY_BUSY: return 'w-full bg-red-500 animate-pulse';
      default: return 'w-0';
    }
  };

  const getCrowdLabel = (status: CrowdStatus) => {
    switch (status) {
        case CrowdStatus.QUIET: return "Quiet • Good for chatting";
        case CrowdStatus.MODERATE: return "Moderate • Standard wait time";
        case CrowdStatus.BUSY: return "Busy • High Energy";
        case CrowdStatus.VERY_BUSY: return "Jam Packed • Expect Wait";
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-mandi-dark-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-mandi-dark-border shadow-2xl relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80">
          <img 
            src={shop.thumbnailUrl} 
            alt={shop.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mandi-dark-card to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{shop.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
              <span className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/30 font-bold">
                <Star size={16} fill="currentColor" /> {shop.rating} ({shop.reviewCount})
              </span>
              <span className="text-gray-300 flex items-center gap-1">
                <Map size={16} /> {shop.formattedAddress || `${shop.village}, ${shop.district}`}
              </span>
              {shop.isOpen ? (
                 <span className="text-green-400 flex items-center gap-1 font-medium"><Clock size={16}/> Open Now</span>
              ) : (
                 <span className="text-red-400 flex items-center gap-1 font-medium"><Clock size={16}/> Closed</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
          
          {/* Left Column: Info & Menu */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Description */}
            <p className="text-gray-300 leading-relaxed text-lg">
              {shop.description}
            </p>

            {/* Signature Dish Highlight */}
            <div className="bg-gradient-to-br from-mandi-500/10 to-transparent p-6 rounded-2xl border border-mandi-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Award size={100} className="text-mandi-500" />
               </div>
               <h3 className="text-mandi-400 font-bold uppercase tracking-wider text-sm mb-2">Must Try Signature Dish</h3>
               <div className="text-2xl font-bold text-white mb-1">{shop.signatureDish}</div>
               <p className="text-gray-400 text-sm">Highly recommended by local foodies.</p>
            </div>

            {/* Menu Highlights */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                Menu Highlights
              </h3>
              <div className="space-y-3">
                {shop.menuHighlights.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {item.name}
                        {item.isBestseller && <span className="text-[10px] bg-red-500 text-white px-1.5 rounded font-bold uppercase tracking-wide">Hot</span>}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{item.description}</div>
                    </div>
                    <div className="font-bold text-mandi-400">₹{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

             {/* Reviews Snapshot */}
             <div>
              <h3 className="text-xl font-bold text-white mb-4">What Foodies Say</h3>
              <div className="grid gap-4">
                {shop.reviews.slice(0, 2).map((review, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-gray-200">{review.user}</span>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-400 text-sm italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Quick Actions & Details */}
          <div className="space-y-6">
            
            {/* LIVE CROWD METER */}
            <div className="bg-zinc-900 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                   <h4 className="text-gray-400 text-xs font-bold uppercase flex items-center gap-2">
                       <Users size={14} className="text-mandi-500"/> Live Crowd
                   </h4>
                   <span className="text-xs text-white font-bold">{getCrowdLabel(shop.crowdStatus).split('•')[0]}</span>
                </div>
                
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden mb-2">
                   <div className={`h-full rounded-full transition-all duration-1000 ${getCrowdMeterWidth(shop.crowdStatus)}`}></div>
                </div>
                <div className="text-[10px] text-gray-500 text-right">
                   Based on live data • {getCrowdLabel(shop.crowdStatus).split('•')[1]}
                </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <h4 className="text-gray-400 text-xs font-bold uppercase mb-4">Quick Actions</h4>
              <div className="grid gap-3">
                <button 
                  onClick={handleDirections}
                  className="flex items-center justify-center gap-2 w-full bg-mandi-500 hover:bg-mandi-400 text-black font-bold py-3 rounded-xl transition-colors shadow-lg shadow-mandi-500/20"
                >
                  <Navigation size={18} /> Get Directions
                </button>
                
                <a href={`tel:${shop.phoneNumber}`} className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10">
                  <Phone size={18} /> Call Now
                </a>
                
                <button 
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10"
                >
                  <Share2 size={18} /> Share Spot
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-4">
              <h4 className="text-gray-400 text-xs font-bold uppercase">Features</h4>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Spice Level</div>
                <div className="text-white font-medium flex items-center gap-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`w-2 h-6 rounded-sm mr-1 ${
                        i < (shop.spiceLevel === 'EXTREME' ? 4 : shop.spiceLevel === 'SPICY' ? 3 : shop.spiceLevel === 'MEDIUM' ? 2 : 1) 
                        ? 'bg-red-500' 
                        : 'bg-gray-700'
                      }`}></div>
                    ))}
                  </div>
                  {shop.spiceLevel}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Portion Sizes</div>
                <div className="flex flex-wrap gap-2">
                  {shop.portionSizes.map(size => (
                    <span key={size} className="text-xs bg-black/30 text-gray-300 px-2 py-1 rounded border border-white/10">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-mandi-900/20 rounded-2xl p-5 border border-mandi-500/20">
               <div className="text-center">
                 <div className="text-3xl font-bold text-mandi-500">{shop.rating}</div>
                 <div className="flex justify-center text-yellow-500 my-1">
                   <Star fill="currentColor" size={20} />
                   <Star fill="currentColor" size={20} />
                   <Star fill="currentColor" size={20} />
                   <Star fill="currentColor" size={20} />
                   <Star fill="currentColor" size={20} />
                 </div>
                 <div className="text-xs text-gray-400">Based on {shop.reviewCount} reviews</div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MandiDetail;
