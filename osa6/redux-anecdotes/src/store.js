import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdote'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

export const store = createStore(combineReducers(
  {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }),
  composeWithDevTools()
)

//initializing state
anecdoteService.getAll().then(anecdotes => {
  store.dispatch(initializeAnecdotes(anecdotes))
})