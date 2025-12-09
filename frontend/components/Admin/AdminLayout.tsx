
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Store, Users, Settings, LogOut, Shield, MessageSquare, FileText, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Manage Shops', icon: Store, path: '/admin/dashboard/shops' },
    { name: 'Users', icon: Users, path: '/admin/dashboard/users' },
    { name: 'Reviews', icon: MessageSquare, path: '/admin/dashboard/reviews' },
    { name: 'System Logs', icon: FileText, path: '/admin/dashboard/logs' },
    { name: 'Settings', icon: Settings, path: '/admin/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
       
       {/* Mobile Header */}
       <div className="md:hidden fixed top-0 w-full bg-zinc-900 border-b border-white/5 z-30 flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-mandi-500 font-bold text-lg">
             <Shield size={20} /> ADMIN
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
       </div>

       {/* Sidebar Overlay for Mobile */}
       {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
       )}

       {/* Sidebar */}
       <div className={`
          fixed md:static inset-y-0 left-0 w-64 bg-zinc-900 border-r border-white/5 flex flex-col z-40 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
       `}>
          <div className="p-6 border-b border-white/5 hidden md:block">
             <div className="flex items-center gap-2 text-mandi-500 font-bold text-xl tracking-tight">
                <Shield size={24} /> ADMIN
             </div>
             <div className="text-gray-500 text-xs mt-1">MandiHunt Management</div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-16 md:mt-0">
             {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                     navigate(item.path);
                     setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                     location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path))
                       ? 'bg-mandi-500/10 text-mandi-500 border border-mandi-500/20' 
                       : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                   <item.icon size={18} />
                   <span className="font-medium text-sm">{item.name}</span>
                </button>
             ))}
          </nav>

          <div className="p-4 border-t border-white/5">
             <div className="mb-4 px-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-500">System Online</span>
             </div>
             <button 
               onClick={handleLogout}
               className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
             >
                <LogOut size={18} />
                <span className="font-medium text-sm">Logout</span>
             </button>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 bg-black min-h-screen overflow-y-auto w-full pt-16 md:pt-0">
          <Outlet />
       </div>
    </div>
  );
};

export default AdminLayout;
