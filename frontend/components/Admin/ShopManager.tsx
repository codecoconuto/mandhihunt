import React, { useEffect, useState } from 'react';
import { fetchAllShops, deleteShop } from '../../services/adminService';
import { Trash2, Edit, Plus } from 'lucide-react';

const ShopManager = () => {
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = () => {
    fetchAllShops().then(setShops).catch(console.error);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
        await deleteShop(id);
        loadShops();
    }
  };

  return (
    <div className="p-8">
       <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Manage Shops</h1>
          <button className="bg-mandi-500 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-mandi-400">
             <Plus size={18} /> Add Shop
          </button>
       </div>

       <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-black text-gray-200 uppercase font-bold text-xs">
                <tr>
                   <th className="px-6 py-4">Name</th>
                   <th className="px-6 py-4">Location</th>
                   <th className="px-6 py-4">Rating</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {shops.map((shop) => (
                   <tr key={shop.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{shop.name}</td>
                      <td className="px-6 py-4">{shop.village}</td>
                      <td className="px-6 py-4 text-yellow-500 font-bold">{shop.rating} ★</td>
                      <td className="px-6 py-4">
                         <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded-full text-xs font-bold">
                            {shop.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                         <button className="p-2 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors">
                            <Edit size={16} />
                         </button>
                         <button 
                           onClick={() => handleDelete(shop.id)}
                           className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
                         >
                            <Trash2 size={16} />
                         </button>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

export default ShopManager;