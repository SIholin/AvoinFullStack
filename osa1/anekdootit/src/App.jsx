import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const votes = Array(8).fill(0)
   
  const [voted, setVoted] = useState(votes)
  const [r, setR] = useState(0)
  const [most, setMost] = useState(0)

  const setRandom = () => {
    const random = Math.floor(Math.random() * 8)
    setR(random)
  }

  const setVotes = () => {
    const copy = [...voted]
    copy[r] += 1
    setVoted(copy)

    const biggest = Math.max(...copy)
    const i = copy.indexOf(biggest)
    setMost(i)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[r]}</p>
      <p>has {voted[r]} votes</p>
      <Button text={'vote'} onClick={() => setVotes()}/>
      <Button text={'next anecdote'} onClick={() => setRandom()}/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]}</p>
    </div>
  )
}

export default App