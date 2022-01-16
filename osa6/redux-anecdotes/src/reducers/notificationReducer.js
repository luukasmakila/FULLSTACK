const notificationReducer = (state = {message: ''}, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return state = {...state, message: action.data}
    case 'DELETE_NOTIFICATION':
      return state = {...state, message: action.data}
    default:
      return state
  }
}

//action creators
export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  }
}

export const deleteNotification = (message) => {
  return {
    type: 'DELETE_NOTIFICATION',
    data: ''
  }
}

export default notificationReducer