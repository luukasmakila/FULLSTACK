import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = (anecdoteVoted) => {
    const anecdoteIdx = anecdotes.findIndex((anecdote => anecdote.id === anecdoteVoted.id))
    anecdotes[anecdoteIdx].votes = anecdotes[anecdoteIdx].votes + 1
    props.addVote(anecdoteVoted)
    props.setNotification(`you voted '${anecdoteVoted.content}'`, 5)
  }

  anecdotes.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if(state.filter.filter === ''){
    return {anecdotes: state.anecdotes}
  } else{
    console.log(state.filter.filter)
    const anecdotesFiltered = state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter.filter)
    )
    return {anecdotes: anecdotesFiltered}
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes