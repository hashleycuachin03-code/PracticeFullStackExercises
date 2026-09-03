const Filter = ({ searchTerm, onSearchChange }) => (
  
  <div>
    filter shown with: 
    <div>
      <input
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  </div>
)

export default Filter