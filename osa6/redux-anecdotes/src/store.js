import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(combineReducers({anecdoteReducer, notificationReducer}), composeWithDevTools())