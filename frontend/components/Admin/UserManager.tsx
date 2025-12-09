
import React, { useEffect, useState } from 'react';
import { fetchAllUsers, updateUserStatus } from '../../services/adminService';
import { Ban, CheckCircle, Search } from 'lucide-react';

const UserManager = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    fetchAllUsers().then(setUsers).catch(console.error);
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Banned' : 'Active';
    if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
        await updateUserStatus(id, newStatus);
        loadUsers();
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage registered users, moderators, and admins.</p>
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
             <input 
               type="text" 
               placeholder="Search users..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-zinc-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-mandi-500"
             />
          </div>
       </div>

       <div className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-sm text-gray-400">
             <thead className="bg-black text-gray-200 uppercase font-bold text-xs">
                <tr>
                   <th className="px-6 py-4">Name</th>
                   <th className="px-6 py-4">Email</th>
                   <th className="px-6 py-4">Role</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {filteredUsers.map((user) => (
                   <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                            {user.name.charAt(0)}
                         </div>
                         {user.name}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                            user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                            user.role === 'moderator' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-700/50 text-gray-400'
                         }`}>
                            {user.role}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                            user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                         }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {user.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button 
                           onClick={() => handleStatusChange(user.id, user.status)}
                           className={`p-2 rounded-lg transition-colors ${
                              user.status === 'Active' 
                                ? 'hover:bg-red-500/20 text-gray-500 hover:text-red-400' 
                                : 'hover:bg-green-500/20 text-gray-500 hover:text-green-400'
                           }`}
                           title={user.status === 'Active' ? "Ban User" : "Activate User"}
                         >
                            {user.status === 'Active' ? <Ban size={16} /> : <CheckCircle size={16} />}
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

export default UserManager;
