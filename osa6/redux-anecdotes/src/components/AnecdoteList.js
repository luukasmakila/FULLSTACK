import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, deleteNotification } from '../reducers/notificationReducer'

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
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if(state.filter.filter === ''){
      return state.anecdotes
    } else{
      const anecdotesFiltered = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter.filter))
      return anecdotesFiltered
    }
  })

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(deleteNotification(''))
    }, 5000)
  }

  anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id, anecdote.content)} />
      )}
    </div>
  )
}

export default AnecdoteList
