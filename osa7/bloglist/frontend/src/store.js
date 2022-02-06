import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/BlogReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const store = createStore(combineReducers(
  {
    blogs: blogReducer,
    notification: notificationReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)