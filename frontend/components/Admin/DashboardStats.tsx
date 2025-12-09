import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Search, MapPin, DollarSign } from 'lucide-react';
import { fetchDashboardStats } from '../../services/adminService';

const DashboardStats = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchDashboardStats().then(data => setStats(data.data)).catch(console.error);
  }, []);

  if (!stats) return <div className="p-8 text-white">Loading Analytics...</div>;

  return (
    <div className="p-8">
       <h1 className="text-3xl font-bold text-white mb-8">System Overview</h1>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Users size={24} /></div>
                <span className="text-green-500 text-xs font-bold">+12%</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">{stats.totalUsers.toLocaleString()}</div>
             <div className="text-gray-500 text-xs uppercase font-bold">Total Users</div>
          </div>
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500"><MapPin size={24} /></div>
                <span className="text-green-500 text-xs font-bold">+5</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">{stats.totalShops}</div>
             <div className="text-gray-500 text-xs uppercase font-bold">Active Shops</div>
          </div>
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-mandi-500/10 rounded-xl text-mandi-500"><Search size={24} /></div>
                <span className="text-green-500 text-xs font-bold">+24%</span>
             </div>
             <div className="text-3xl font-bold text-white mb-1">{stats.searchesToday}</div>
             <div className="text-gray-500 text-xs uppercase font-bold">Searches Today</div>
          </div>
          <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><DollarSign size={24} /></div>
             </div>
             <div className="text-3xl font-bold text-white mb-1">{stats.revenue}</div>
             <div className="text-gray-500 text-xs uppercase font-bold">Revenue</div>
          </div>
       </div>

       {/* Chart */}
       <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 h-96">
          <h3 className="text-lg font-bold text-white mb-6">Traffic Overview</h3>
          <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={stats.trafficData}>
                <defs>
                   <linearGradient id="colorSearch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#18181b', borderColor: '#333', borderRadius: '12px' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="searches" stroke="#f59e0b" fillOpacity={1} fill="url(#colorSearch)" />
             </AreaChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
};

export default DashboardStats;