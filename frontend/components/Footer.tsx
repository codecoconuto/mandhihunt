import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tighter flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-mandi-500 flex items-center justify-center text-black font-bold text-lg">M</span>
              MANDI<span className="text-mandi-500">HUNT</span>
            </h2>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              We are on a mission to map every legendary Kuzhimanthi spot in God's Own Country. 
              No gatekeeping. Just pure rice & meat bliss.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-mandi-500 hover:text-black transition-all border border-white/10 hover:border-mandi-500">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm text-mandi-500">Explore</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Trending Now</li>
              <li className="hover:text-white cursor-pointer transition-colors">Submit a Spot</li>
              <li className="hover:text-white cursor-pointer transition-colors">Spice Guide</li>
              <li className="hover:text-white cursor-pointer transition-colors">Mandi Merchandise</li>
            </ul>
          </div>

          <div>
             <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm text-mandi-500">Legal</h3>
             <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Cookie Settings</li>
             </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2024 MandiHunt Kerala. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with 🌶️ in Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer;