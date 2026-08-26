import {useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]  

  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const mostVoted = votes.indexOf(Math.max(...votes))

  const anecdoteClick = (nextAnecdote) => {
    setSelected(nextAnecdote)
  }

  const voteClick = () => {
    setVotes(previousVotes => {
      console.log('previousVotes', previousVotes);
      const updatedVotes = [...previousVotes]
      updatedVotes[selected] += 1
      return updatedVotes
    })
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <Button onClick={voteClick} text="vote" />
        <Content vote={votes[selected]} />
        <div><Button onClick={() => anecdoteClick((Math.floor(Math.random() * anecdotes.length)))} text="next anecdote" /></div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[mostVoted]}
        <Content vote={votes[mostVoted]} />
    </div>
  )
}

const Content = ({vote}) => {
  return (
    <div>
      <p>has {vote} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

export default App