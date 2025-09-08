import { useState, useEffect } from 'react';

const WeatherWidget = ({ themeColor = 'emerald' }) => {
  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Loading...',
    icon: '☁️'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock weather data for demonstration
  // In a real app, you would fetch from a weather API
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data
        const mockWeatherData = {
          temp: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30°C
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
          icon: ['☀️', '☁️', '🌧️', '⛅'][Math.floor(Math.random() * 4)]
        };
        
        setWeather(mockWeatherData);
        setLoading(false);
      } catch (err) {
        setError('Could not load weather');
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="weather-widget glass-effect p-3 rounded-xl flex items-center justify-center">
        <div className="animate-pulse flex space-x-2">
          <div className="rounded-full bg-slate-700 h-6 w-6"></div>
          <div className="h-4 bg-slate-700 rounded w-16"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget glass-effect p-3 rounded-xl">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="weather-widget glass-effect p-3 rounded-xl flex items-center space-x-2 hover-scale transition-all duration-300">
      <span className="text-2xl" role="img" aria-label="Weather condition">{weather.icon}</span>
      <div className="flex flex-col items-start">
        <span className={`text-${themeColor}-400 font-medium text-lg`}>{weather.temp}°C</span>
        <span className="text-slate-300 text-xs">{weather.condition}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;