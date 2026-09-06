import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  //fetch data "arto hellas" from db.json server using persona.js module
    useEffect(() => {
      personService.getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

  console.log('render', persons.length, 'persons')

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService.update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    personService.create({ name: newName, number: newNumber })
      .then(postPerson => {
        setPersons(persons.concat(postPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id)
        .then(() => {
          console.log(`Deleting person with id: ${id}, name: ${person.name}`)
          setPersons(persons.filter((p) => p.id !== id))
        })
      }
    }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        onSearchChange={(event) => setSearchTerm(event.target.value)}
      />
      <h3>Add a new:</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumberChange={(event) => setNewNumber(event.target.value)}
        onSubmit={addPerson}
      />
      <h3>Numbers:</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}
//export default App
export default App