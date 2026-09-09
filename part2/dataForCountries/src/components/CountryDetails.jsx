import CountryVisuals from './CountryVisuals'
import WeatherDetails from './WeatherDetails'

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages ?? {})
  const capital = country.capital?.[0]

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
          <WeatherDetails capital={capital} />
        </div>
        <CountryVisuals country={country} />
      </div>
    </section>
  )
}

export default CountryDetails