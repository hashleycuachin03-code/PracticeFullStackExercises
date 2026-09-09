import { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherDetails = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const [weatherCapital, setWeatherCapital] = useState(null)
  const [weatherError, setWeatherError] = useState('')
  const apiKey = import.meta.env.VITE_SOME_KEY
  const unavailableMessage = !capital
    ? 'Weather data is not available for this country'
    : !apiKey
      ? 'Weather data is not available'
      : ''

  useEffect(() => {
    if (!capital || !apiKey) {
      return
    }

    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: capital, appid: apiKey, units: 'metric' }
    })
      .then(response => {
        setWeather(response.data)
        setWeatherCapital(capital)
        setWeatherError('')
      })
      .catch(() => {
        setWeatherCapital(null)
        setWeatherError('Weather data is not available')
      })
  }, [capital, apiKey])

  return (
    <>
      <h2>Weather in {capital}</h2>
      {weather && weatherCapital === capital && (
        <div className="weather-panel">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>
            <p className="temperature">{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
      {(unavailableMessage || weatherError) && (
        <p className="notice">{unavailableMessage || weatherError}</p>
      )}
    </>
  )
}

export default WeatherDetails