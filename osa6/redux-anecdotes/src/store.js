import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(combineReducers(
  {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }),
  composeWithDevTools()
  )