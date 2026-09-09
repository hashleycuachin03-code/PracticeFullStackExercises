const CountryVisuals = ({ country }) => (
  <div className="visuals">
    <img className="flag" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    <p className="image-caption">{country.flags.alt}</p>
    <img
      className="coat-of-arms"
      src={country.coatOfArms.svg}
      alt={`Coat of arms of ${country.name.common}`}
    />
  </div>
)

export default CountryVisuals