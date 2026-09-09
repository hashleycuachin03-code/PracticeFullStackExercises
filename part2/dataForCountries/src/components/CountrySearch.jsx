const CountrySearch = ({ filter, onFilterChange }) => (
  <form className="search-form" onSubmit={(event) => event.preventDefault()}>
    <label htmlFor="country-search">Search by country name</label>
    <input
      id="country-search"
      value={filter}
      onChange={onFilterChange}
      placeholder="Try Finland or Japan"
    />
  </form>
)

export default CountrySearch