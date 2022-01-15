const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action.data)

  let newState = [...state]
  switch(action.type){
    case 'VOTE':
      const anecdoteIdx = newState.findIndex((anecdote => anecdote.id === action.data))
      newState[anecdoteIdx].votes = newState[anecdoteIdx].votes + 1
      return newState
    case 'ADD':
      console.log(action.data)
      const anecdote = asObject(action.data)
      return newState.concat(anecdote)
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
  return {
    type: 'ADD',
    data: content
  }
}
export default reducer