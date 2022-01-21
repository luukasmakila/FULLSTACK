import anecdoteService from '../services/anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  let newState = [...state]
  switch(action.type){
    case 'VOTE':
      const anecdoteIdx = newState.findIndex((anecdote => anecdote.id === action.data))
      newState[anecdoteIdx].votes = newState[anecdoteIdx].votes + 1
      const anecdoteVoted = newState[anecdoteIdx]
      anecdoteService.addVote(anecdoteVoted)
      return newState
    case 'ADD':
      const anecdote = asObject(action.data)
      anecdoteService.addNew(anecdote)
      return newState.concat(anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

//action creators
export const addVote = (id) => {
  return {
    type: 'VOTE', 
    data: id
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(content)
    console.log(newAnecdote)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer