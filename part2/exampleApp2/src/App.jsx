import Note from './components/Note'
import {useState} from 'react'

const App = (props) => {

  //state variable for the list of notes, initialized with the notes passed as props
  const [notes, setNotes] = useState(props.notes)
  //state variable for the new note input field
  const [newNote, setNewNote] = useState('add new note...')
  //state variable to toggle between showing all notes or only important notes
  const [showAll, setShowAll] = useState(true)
  //debugging 
  console.log('render', notes, 'notes')

  //handling the change of the input field
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  //adding a new note to the list of notes
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  //show all notes or only important notes
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

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
          <Note key={note.id} note={note} />
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