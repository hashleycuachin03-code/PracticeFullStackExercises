const CountryResults = ({ countries, onSelectCountry }) => (
  <ul className="country-list">
    {countries.map(country => (
      <li key={country.cca3}>
        <span>{country.name.common}</span>
        <button type="button" onClick={() => onSelectCountry(country)}>show</button>
      </li>
    ))}
  </ul>
)

export default CountryResults