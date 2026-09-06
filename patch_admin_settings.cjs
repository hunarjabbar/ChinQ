const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminSettings.tsx', 'utf8');

// Ensure lucide icon import includes Palette
if (!content.includes('Palette')) {
  content = content.replace('Settings, Save, Database, Shield, Globe, Wifi', 'Settings, Save, Database, Shield, Globe, Wifi, Palette');
}

// Add colors to state
content = content.replace(
  /systemMaintenance: siteSettings\.systemMaintenance/g,
  "systemMaintenance: siteSettings.systemMaintenance,\n    brandColor: siteSettings.brandColor || '#990000',\n    inkColor: siteSettings.inkColor || '#1A1A1A',\n    paperColor: siteSettings.paperColor || '#FAFAFA'"
);

const colorsSection = `
          {/* Brand Identity & Colors */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Palette size={18} className="text-brand-800" />
              Brand Identity & Colors
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Primary Brand (Accents)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.brandColor}
                    onChange={(e) => setSettings({ ...settings, brandColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.brandColor}
                    onChange={(e) => setSettings({ ...settings, brandColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-mono uppercase"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ink Color (Text)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.inkColor}
                    onChange={(e) => setSettings({ ...settings, inkColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.inkColor}
                    onChange={(e) => setSettings({ ...settings, inkColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-mono uppercase"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Paper Color (Background)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.paperColor}
                    onChange={(e) => setSettings({ ...settings, paperColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.paperColor}
                    onChange={(e) => setSettings({ ...settings, paperColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-mono uppercase"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Color changes will propagate instantly to all clients connected to the platform.
            </p>
          </div>
`;

content = content.replace(
  "{/* Infrastructure & Regional Routing Settings */}",
  colorsSection + "\n          {/* Infrastructure & Regional Routing Settings */}"
);

fs.writeFileSync('src/pages/AdminSettings.tsx', content);
