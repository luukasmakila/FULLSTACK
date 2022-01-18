import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const store = createStore(combineReducers(
  {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)