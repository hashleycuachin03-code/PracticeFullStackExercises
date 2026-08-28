const Filter = ({ searchTerm, onSearchChange }) => (
  <div>
    filter shown with: <input
      value={searchTerm}
      onChange={onSearchChange}
    />
  </div>
)

export default Filter