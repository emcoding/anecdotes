import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

// I considered extracting components, but the Rule of Three 
// made me decide that it is not worth the added complexity of indirection.
// Is that the right choice? 


const App = ({anecdotes}) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const handleNewStory = () => {
    // choose random number for index
    const newStoryIndex = Math.floor(Math.random() * anecdotes.length) 

    // prevent same story popping up
    if (newStoryIndex !== selected) {
      setSelected(newStoryIndex)
    }
    else {
      handleNewStory()
    }
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p className='anecdote'>{anecdotes[selected]}</p>
      
      <button onClick={handleNewStory}> New anecdote</button>
      <button onClick={handleVote}> Vote up</button>
     
      <h2>Most popular anecdote</h2>
      <p className='anecdote'>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  )
}

const anecdotes = [
  'Duplication is far cheaper than the wrong abstraction',
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))