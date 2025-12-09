
import React, { useEffect, useState } from 'react';
import { fetchAllShops, deleteShop, createShop, updateShop } from '../../services/adminService';
import { Trash2, Edit, Plus, X, Save, MapPin } from 'lucide-react';

const ShopManager = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', village: '', rating: '4.0', status: 'Active' });

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

  const handleOpenModal = (shop: any = null) => {
      if (shop) {
          setEditingShop(shop);
          setFormData({ name: shop.name, village: shop.village, rating: shop.rating, status: shop.status });
      } else {
          setEditingShop(null);
          setFormData({ name: '', village: '', rating: '4.0', status: 'Active' });
      }
      setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (editingShop) {
          await updateShop(editingShop.id, formData);
      } else {
          await createShop(formData);
      }
      setIsModalOpen(false);
      loadShops();
  };

  return (
    <div className="p-4 md:p-8">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Shops</h1>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-mandi-500 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-mandi-400 shadow-lg active:scale-95 transition-all w-full md:w-auto justify-center"
          >
             <Plus size={18} /> Add Shop
          </button>
       </div>

       <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400 min-w-[600px]">
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
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                shop.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                                {shop.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                            <button 
                                onClick={() => handleOpenModal(shop)}
                                className="p-2 hover:bg-blue-500/20 hover:text-blue-400 rounded-lg transition-colors"
                            >
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

       {/* Add/Edit Modal */}
       {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="bg-zinc-900 w-full max-w-md rounded-2xl border border-white/10 shadow-2xl p-6">
                   <div className="flex justify-between items-center mb-6">
                       <h3 className="text-xl font-bold text-white">{editingShop ? "Edit Shop" : "Add New Shop"}</h3>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
                   </div>
                   
                   <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Shop Name</label>
                           <input 
                             type="text" 
                             required
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-mandi-500 outline-none"
                           />
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location / Village</label>
                           <input 
                             type="text" 
                             required
                             value={formData.village}
                             onChange={(e) => setFormData({...formData, village: e.target.value})}
                             className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-mandi-500 outline-none"
                           />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                           <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rating</label>
                                <input 
                                    type="number" 
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-mandi-500 outline-none"
                                />
                           </div>
                           <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                <select 
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:border-mandi-500 outline-none"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                           </div>
                       </div>

                       <div className="pt-4 flex gap-3">
                           <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold">Cancel</button>
                           <button type="submit" className="flex-1 py-3 rounded-xl bg-mandi-500 hover:bg-mandi-400 text-black font-bold flex items-center justify-center gap-2">
                               <Save size={18} /> Save Shop
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       )}
    </div>
  );
};

export default ShopManager;
