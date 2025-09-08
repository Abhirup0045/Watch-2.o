import { useState } from 'react';

const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  // Handle theme color change
  const handleThemeChange = (color) => {
    setLocalSettings({ ...localSettings, themeColor: color });
  };

  // Handle save settings
  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  // Available theme colors
  const themeColors = [
    { name: 'Emerald', value: 'emerald' },
    { name: 'Sky', value: 'sky' },
    { name: 'Violet', value: 'violet' },
    { name: 'Rose', value: 'rose' },
    { name: 'Amber', value: 'amber' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm fade-in">
      <div className="glass-effect p-6 rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-slate-200">Settings</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Theme Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">Theme Color</h3>
            <div className="flex flex-wrap gap-2">
              {themeColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleThemeChange(color.value)}
                  className={`w-8 h-8 rounded-full transition-all ${localSettings.themeColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''}`}
                  style={{ backgroundColor: `var(--color-${color.value}-500)` }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          
          {/* Show Weather Toggle */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.showWeather}
                onChange={() => setLocalSettings({ ...localSettings, showWeather: !localSettings.showWeather })}
                className={`form-checkbox h-4 w-4 text-${localSettings.themeColor}-500 rounded focus:ring-0`}
              />
              <span className="text-sm text-slate-300">Show Weather Widget</span>
            </label>
          </div>

          {/* Show Date Toggle */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localSettings.showDate}
                onChange={() => setLocalSettings({ ...localSettings, showDate: !localSettings.showDate })}
                className={`form-checkbox h-4 w-4 text-${localSettings.themeColor}-500 rounded focus:ring-0`}
              />
              <span className="text-sm text-slate-300">Show Date</span>
            </label>
          </div>
          
          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full text-white py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: `var(--color-${localSettings.themeColor}-600)`,
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = `var(--color-${localSettings.themeColor}-700)`}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = `var(--color-${localSettings.themeColor}-600)`}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;