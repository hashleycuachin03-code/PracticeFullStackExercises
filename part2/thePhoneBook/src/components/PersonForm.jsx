const PersonForm = ({ newName, newNumber, onNameChange, onNumberChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: 
      <div>
        <input
          value={newName}
          onChange={onNameChange}
        />
      </div>
    </div>
    <div>
      number: 
      <div>
        <input
          value={newNumber}
          onChange={onNumberChange}
        />
      </div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm