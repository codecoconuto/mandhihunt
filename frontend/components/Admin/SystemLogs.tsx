
import React, { useEffect, useState } from 'react';
import { fetchSystemLogs } from '../../services/adminService';
import { AlertTriangle, Info, XCircle, Search, RefreshCw } from 'lucide-react';

const SystemLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchSystemLogs().then(setLogs).catch(console.error);
  }, []);

  const getIcon = (type: string) => {
     switch(type) {
         case 'ERROR': return <XCircle className="text-red-500" size={18} />;
         case 'WARN': return <AlertTriangle className="text-yellow-500" size={18} />;
         default: return <Info className="text-blue-500" size={18} />;
     }
  };

  return (
    <div className="p-8">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">System Logs</h1>
            <p className="text-gray-500 text-sm mt-1">Real-time system events and errors.</p>
          </div>
          <button onClick={() => fetchSystemLogs().then(setLogs)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white">
             <RefreshCw size={20} />
          </button>
       </div>

       <div className="bg-black border border-white/10 rounded-xl overflow-hidden font-mono text-sm">
          <div className="bg-zinc-900/50 p-3 border-b border-white/10 flex items-center gap-4 text-xs font-bold text-gray-500 uppercase">
             <div className="w-24">Type</div>
             <div className="w-48">Timestamp</div>
             <div>Message</div>
          </div>
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
             {logs.map((log) => (
                <div key={log.id} className="p-3 flex items-center gap-4 hover:bg-white/5 transition-colors">
                   <div className="w-24 flex items-center gap-2 font-bold">
                      {getIcon(log.type)} {log.type}
                   </div>
                   <div className="w-48 text-gray-500 text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                   </div>
                   <div className="text-gray-300">
                      {log.message}
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default SystemLogs;
