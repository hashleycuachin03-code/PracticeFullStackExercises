import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">WORLD ATLAS / LIVE LOOKUP</p>
        <h1>Find a country</h1>
        <p className="intro">Explore essential facts, flags, and the weather over each capital.</p>
      </header>
      <form className="search-form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="country-search">Search by country name</label>
        <input id="country-search" value={filter} onChange={handleFilterChange} placeholder="Try Finland or Japan" />
      </form>
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        <p className="notice">Too many matches, specify another filter.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <ul className="country-list">
          {filteredCountries.map(country => (
            <li key={country.cca3}>
              <span>{country.name.common}</span>
              <button type="button" onClick={() => setSelectedCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages ?? {})
  const capital = country.capital?.[0]
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
      params: {
        q: capital,
        appid: apiKey,
        units: 'metric'
      }
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
    <section className="country-details">
      <div className="details-heading">
        <p className="eyebrow">COUNTRY PROFILE</p>
        <h1>{country.name.common}</h1>
      </div>
      <div className="fact-grid">
        <p><span>Capital</span>{country.capital?.join(', ')}</p>
        <p><span>Area</span>{country.area.toLocaleString()} km²</p>
      </div>
      <div className="details-columns">
        <div>
          <h2>Languages</h2>
          <ul className="language-list">
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
          </ul>
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
        </div>
        <div className="visuals">
          <img className="flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <p className="image-caption">{country.flags.alt}</p>
          <img className="coat-of-arms" src={country.coatOfArms.svg} alt={`Coat of arms of ${country.name.common}`} />
        </div>
      </div>
    </section>
  )
}

export default App