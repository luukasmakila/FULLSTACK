import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/BlogReducer'
import userReducer from './reducers/UserReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const store = createStore(combineReducers(
  {
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
)