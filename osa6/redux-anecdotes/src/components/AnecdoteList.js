import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdoteReducer)
  const dispatch = useDispatch()

  anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(addVote(anecdote.id))} />
      )}
    </div>
  )
}

export default AnecdoteList
