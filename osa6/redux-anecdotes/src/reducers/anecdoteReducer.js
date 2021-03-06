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
      return newState
    case 'ADD':
      const anecdote = action.data
      return newState.concat(anecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return newState
  }
}

//action creators
export const addVote = (anecdote) => {
  return async dispatch => {
    anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(asObject(content))
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer