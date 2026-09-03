import Note from './Note'

const Notes = ({notes}) => {
  return (
    <ul>
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
    </ul>
  )
}

export default Notes