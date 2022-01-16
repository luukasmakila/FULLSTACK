const notificationReducer = (state = {message: 'initial message'}, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return state = {...state, message: action.data}
  }
  return state
}

//action creators
export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  }
}

export default notificationReducer