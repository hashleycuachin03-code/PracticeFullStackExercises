import { useEffect, useState } from 'react'
import axios from 'axios'
import AppHeader from './components/AppHeader'
import CountryDetails from './components/CountryDetails'
import CountryResults from './components/CountryResults'
import CountrySearch from './components/CountrySearch'

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
      <AppHeader />
      <CountrySearch filter={filter} onFilterChange={handleFilterChange} />
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        <p className="notice">Too many matches, specify another filter.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountryResults countries={filteredCountries} onSelectCountry={setSelectedCountry} />
      )}
    </div>
  )
}

export default App