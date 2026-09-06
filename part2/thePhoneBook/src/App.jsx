import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notifications from './components/Notifications'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  //fetch data "arto hellas" from db.json server using persona.js module
    useEffect(() => {
      personService.getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }, [])

  useEffect(() => {
    if (!notification) {
      return
    }

    const timeoutId = setTimeout(() => {
      setNotification(null)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [notification])

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
            setNotification({
              message: `${returnedPerson.name}'s number was updated`,
              type: 'success'
            })
          })
          .catch(() => {
            setNotification({
              message: `${existingPerson.name} was already removed from the server`,
              type: 'error'
            })
          })
      }
      return
    }

    personService.create({ name: newName, number: newNumber })
      .then(postPerson => {
        setPersons(persons.concat(postPerson))
        setNewName('')
        setNewNumber('')
        setNotification({
          message: `${postPerson.name} was added to the phonebook`,
          type: 'success'
        })
      })
      .catch(() => {
        setNotification({
          message: 'The person could not be added to the phonebook',
          type: 'error'
        })
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
      <Notifications message={notification?.message} type={notification?.type} />
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