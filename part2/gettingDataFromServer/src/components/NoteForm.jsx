const NoteForm = ({newNote, handleNoteChange, addNote}) => {
  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  )
}

export default NoteForm