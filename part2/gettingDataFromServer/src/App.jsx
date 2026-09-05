import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    //fetching the notes from db.json
    const hook = () => 
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    useEffect(hook, [])
    console.log('render', notes.length, 'notes')

    // adding a new note to the list of notes and db.json
    const addNote = event => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
      }

      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

  //handling the change of the input field
    const handleNoteChange = (event) => {
      console.log(event.target.value)
      setNewNote(event.target.value)
    }
    
    //show all notes or only important notes
    const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id === id ? returnedNote : note))
        })
        .catch(error => {
          alert(
            `the note '${note.content}' was already deleted from server`
          )
          setNotes(notes.filter(n => n.id !== id))
        })
    }

    return (
      <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input 
            value={newNote} 
            onChange={handleNoteChange} 
          />
          <button type="submit">save</button>
        </form>
      </div>
    )
  
}
export default App