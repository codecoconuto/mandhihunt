
import React, { useEffect, useState } from 'react';
import { fetchSettings, saveSettings } from '../../services/adminService';
import { Save, RefreshCw, ToggleLeft, ToggleRight, Key } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings().then(setSettings).catch(console.error);
  }, []);

  const handleToggle = (key: string) => {
     if (!settings) return;
     setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = async () => {
     setSaving(true);
     await saveSettings(settings);
     setSaving(false);
  };

  if (!settings) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl">
       <h1 className="text-3xl font-bold text-white mb-8">Platform Settings</h1>
       
       <div className="space-y-6">
          
          {/* Section: General */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
             <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">General Controls</h3>
             
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div>
                      <div className="font-bold text-white">Maintenance Mode</div>
                      <div className="text-sm text-gray-500">Take the app offline for all users.</div>
                   </div>
                   <button onClick={() => handleToggle('maintenanceMode')} className={`text-4xl ${settings.maintenanceMode ? 'text-mandi-500' : 'text-gray-600'}`}>
                      {settings.maintenanceMode ? <ToggleRight /> : <ToggleLeft />}
                   </button>
                </div>

                <div className="flex items-center justify-between">
                   <div>
                      <div className="font-bold text-white">Allow Registrations</div>
                      <div className="text-sm text-gray-500">Enable new user signups.</div>
                   </div>
                   <button onClick={() => handleToggle('allowNewRegistrations')} className={`text-4xl ${settings.allowNewRegistrations ? 'text-green-500' : 'text-gray-600'}`}>
                      {settings.allowNewRegistrations ? <ToggleRight /> : <ToggleLeft />}
                   </button>
                </div>
             </div>
          </div>

          {/* Section: Features */}
          <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
             <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Feature Flags</h3>
             
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div>
                      <div className="font-bold text-white">AI Search Engine</div>
                      <div className="text-sm text-gray-500">Enable Gemini-powered search results.</div>
                   </div>
                   <button onClick={() => handleToggle('aiSearchEnabled')} className={`text-4xl ${settings.aiSearchEnabled ? 'text-purple-500' : 'text-gray-600'}`}>
                      {settings.aiSearchEnabled ? <ToggleRight /> : <ToggleLeft />}
                   </button>
                </div>
                
                 <div className="flex items-center justify-between">
                   <div>
                      <div className="font-bold text-white">Promo Banners</div>
                      <div className="text-sm text-gray-500">Show promotional banners on home screen.</div>
                   </div>
                   <button onClick={() => handleToggle('promoBannerActive')} className={`text-4xl ${settings.promoBannerActive ? 'text-blue-500' : 'text-gray-600'}`}>
                      {settings.promoBannerActive ? <ToggleRight /> : <ToggleLeft />}
                   </button>
                </div>
             </div>
          </div>

          {/* Section: API Keys */}
           <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 opacity-75">
             <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2 flex items-center gap-2">
                <Key size={18} /> API Configuration (ReadOnly)
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs text-gray-500 font-bold uppercase">Google Maps Key</label>
                   <div className="bg-black p-3 rounded-lg text-gray-400 font-mono text-xs mt-1 truncate">AIzaSy********************</div>
                </div>
                <div>
                   <label className="text-xs text-gray-500 font-bold uppercase">Gemini AI Key</label>
                   <div className="bg-black p-3 rounded-lg text-gray-400 font-mono text-xs mt-1 truncate">AIzaSy********************</div>
                </div>
             </div>
             <div className="mt-4 text-xs text-yellow-500">
                ⚠ To rotate keys, update the backend .env file and restart the server.
             </div>
          </div>

          <div className="flex justify-end pt-4">
             <button 
               onClick={handleSave}
               disabled={saving}
               className="bg-mandi-500 text-black font-bold py-3 px-8 rounded-xl hover:bg-mandi-400 transition-colors flex items-center gap-2"
             >
                {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
                Save Changes
             </button>
          </div>

       </div>
    </div>
  );
};

export default AdminSettings;
