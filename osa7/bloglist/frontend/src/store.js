import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/NotificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const store = createStore(combineReducers(
  {
    notification: notificationReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)