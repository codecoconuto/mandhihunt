import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MandiShop } from '../types';
import L from 'leaflet';
import { Flame, ArrowRight, Star } from 'lucide-react';

// Generate Custom HTML Icon for Map Markers
const createCustomIcon = (rating: number) => {
  const isTrending = rating >= 4.5;
  
  return L.divIcon({
    className: 'bg-transparent', // Remove default square background
    html: `
      <div class="relative flex items-center justify-center w-12 h-12">
        ${isTrending ? `<div class="absolute inset-0 bg-mandi-500 rounded-full animate-ping opacity-40 duration-[2000ms]"></div>` : ''}
        ${isTrending ? `<div class="absolute inset-0 bg-mandi-500 rounded-full opacity-20 blur-sm"></div>` : ''}
        
        <div class="relative z-10 w-9 h-9 rounded-full border-2 border-white shadow-2xl flex flex-col items-center justify-center transition-transform hover:scale-110 ${isTrending ? 'bg-gradient-to-br from-mandi-400 to-mandi-600 text-black' : 'bg-gray-900 text-white'}">
          <span class="font-bold text-xs leading-none">${rating}</span>
          ${isTrending ? '<span class="text-[8px] font-bold mt-[1px]">★</span>' : ''}
        </div>
        
        <div class="absolute bottom-2 w-3 h-3 bg-white rotate-45 z-0 translate-y-1/2 rounded-sm shadow-sm"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48], // Point of the icon which corresponds to marker's location
    popupAnchor: [0, -48], // Point from which the popup should open relative to the iconAnchor
  });
};

interface MapViewProps {
  shops: MandiShop[];
  onMarkerClick: (shop: MandiShop) => void;
}

// Helper to center map automatically when shops change
const RecenterAutomatically = ({ shops }: { shops: MandiShop[] }) => {
  const map = useMap();
  useEffect(() => {
    if (shops.length > 0) {
      const bounds = L.latLngBounds(shops.map(s => [s.coordinates.lat, s.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [shops, map]);
  return null;
};

const MapView: React.FC<MapViewProps> = ({ shops, onMarkerClick }) => {
  const centerPos: [number, number] = shops.length > 0 
    ? [shops[0].coordinates.lat, shops[0].coordinates.lng] 
    : [10.8505, 76.2711]; // Default to Kerala center

  return (
    <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-0">
      <MapContainer 
        center={centerPos} 
        zoom={9} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        className="bg-gray-900"
      >
        {/* Dark Mode Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <RecenterAutomatically shops={shops} />
        
        {shops.map((shop) => (
          <Marker 
            key={shop.id} 
            position={[shop.coordinates.lat, shop.coordinates.lng]}
            icon={createCustomIcon(shop.rating)}
            eventHandlers={{
                // We handle click on popup content mostly, but marker click can also select
                click: () => {}, 
            }}
          >
            <Popup className="leaflet-popup-clean" closeButton={false} minWidth={200}>
              <div 
                className="cursor-pointer group"
                onClick={() => onMarkerClick(shop)}
              >
                {/* Image Preview */}
                <div className="relative h-24 w-full rounded-t-xl overflow-hidden">
                    <img src={shop.thumbnailUrl} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                         <div className="text-white font-bold text-sm truncate shadow-black drop-shadow-md">{shop.name}</div>
                    </div>
                    {shop.rating >= 4.5 && (
                        <div className="absolute top-2 right-2 bg-mandi-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg">
                            <Flame size={8} fill="currentColor" /> TRENDING
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="bg-zinc-900 p-3 rounded-b-xl border-t border-white/5">
                    <div className="flex items-center gap-1 mb-2">
                         <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Must Try:</span>
                         <span className="text-xs text-mandi-400 font-medium truncate">{shop.signatureDish}</span>
                    </div>
                    
                    <button className="w-full bg-white/10 hover:bg-mandi-500 hover:text-black text-white text-xs py-1.5 rounded transition-colors flex items-center justify-center gap-1 font-semibold">
                        View Details <ArrowRight size={10} />
                    </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Overlay Legend */}
      <div className="absolute top-4 right-4 z-[400] bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl hidden md:block">
        <div className="text-xs text-gray-400 font-bold uppercase mb-2">Map Guide</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-mandi-500 animate-pulse"></div>
          <span className="text-xs text-gray-300">Trending (4.5+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-700 border border-gray-500"></div>
          <span className="text-xs text-gray-300">Regular Spot</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;