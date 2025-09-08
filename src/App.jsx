import { useState, useEffect } from 'react'
import './App.css'
import DateDisplay from './Components/DateDisplay'
import WeatherWidget from './Components/WeatherWidget'
import SettingsPanel from './Components/SettingsPanel'

// Main App Component
export default function App() {
  // Settings state
  const [settings, setSettings] = useState({
    themeColor: 'emerald',
    showWeather: false,
    showDate: true,
  })

  // Settings panel visibility
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Handle settings change
  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings)
  }

  return (
    <div className="animated-bg w-full min-h-screen flex items-center justify-center font-sans text-white p-4">
      <DigitalClock
        settings={settings}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  )
}

// Digital Clock Component
function DigitalClock({ settings, onOpenSettings }) {
  // State to hold the current time and format preference
  const [time, setTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(false)

  // useEffect to update the time every second
  useEffect(() => {
    // Set up an interval to tick every 1000ms (1 second)
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Clean up the interval when the component unmounts
    // This is important to prevent memory leaks
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array means this effect runs only once on mount

  // Toggle between 12/24 hour format
  const toggleTimeFormat = () => {
    setIs24Hour(!is24Hour)
  }

  // Helper function to format time with leading zeros
  const formatTime = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM'

    // Format hours based on 12/24 hour preference
    let displayHours = hours
    if (!is24Hour) {
      // Convert to 12-hour format
      displayHours = hours % 12
      displayHours = displayHours ? displayHours : 12 // the hour '0' should be '12'
    }

    // Add leading zeros if needed
    const padZero = (num) => num.toString().padStart(2, '0')
    minutes = padZero(minutes)
    seconds = padZero(seconds)
    displayHours = padZero(displayHours)

    return {
      hours: displayHours,
      minutes,
      seconds,
      ampm,
      is24Hour,
    }
  }

  // Helper function to format the date
  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString(undefined, options)
  }

  const formattedTime = formatTime(time)

  // Get theme color class
  const getThemeColorClass = (baseClass) => {
    return baseClass.replace('emerald', settings.themeColor)
  }

  return (
    // Responsive padding with glass effect
    <div className="glass-effect hover-scale p-6 sm:p-8 md:p-12 rounded-2xl text-center w-full max-w-xs sm:max-w-md md:max-w-2xl transition-all duration-300 fade-in">
      {/* Top bar with weather, format toggle and settings */}
      <div className="flex justify-between items-center mb-4">
        {settings.showWeather && (
          <WeatherWidget themeColor={settings.themeColor} />
        )}
        <div className="flex space-x-2">
          <button
            onClick={toggleTimeFormat}
            className="bg-slate-700/50 text-xs sm:text-sm text-slate-300 py-1 px-3 rounded-full transition-all duration-300 focus:outline-none"
            style={{
              '--ring-color': `var(--color-${settings.themeColor}-500)`,
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = `var(--color-${settings.themeColor}-700, #4b5563)`)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)')
            }
          >
            {is24Hour ? '12h' : '24h'}
          </button>
          <button
            onClick={onOpenSettings}
            className="bg-slate-700/50 text-xs sm:text-sm text-slate-300 py-1 px-3 rounded-full transition-all duration-300 focus:outline-none"
            style={{
              '--ring-color': `var(--color-${settings.themeColor}-500)`,
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = `var(--color-${settings.themeColor}-700, #4b5563)`)
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)')
            }
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Responsive font sizes and spacing */}
      <div className="flex items-end justify-center space-x-1 sm:space-x-2 md:space-x-4">
        <span
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-${settings.themeColor}-400 transition-colors duration-300`}
        >
          {formattedTime.hours}
        </span>
        <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-400 pulse-animation">
          :
        </span>
        <span
          className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-${settings.themeColor}-400 transition-colors duration-300`}
        >
          {formattedTime.minutes}
        </span>
        <div className="flex flex-col items-start ml-2 sm:ml-3 md:ml-4">
          {!formattedTime.is24Hour && (
            <span className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-400">
              {formattedTime.ampm}
            </span>
          )}
          <span
            className={`text-xl sm:text-3xl md:text-4xl font-bold text-${settings.themeColor}-400 pulse-animation`}
          >
            {formattedTime.seconds}
          </span>
        </div>
      </div>
      {/* Responsive font size for the date */}
      {settings.showDate && (
        <DateDisplay
          formatDate={formatDate}
          time={time}
          themeColor={settings.themeColor}
        />
      )}
    </div>
  )
}
