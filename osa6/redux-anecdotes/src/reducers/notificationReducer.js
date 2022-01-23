const initState = {message: null, timeout: 0}

const notificationReducer = (state = initState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      clearTimeout(state.timeout)
      return state = {...state, message: action.data, timeoutID: action.timeout}
    case 'DELETE_NOTIFICATION':
      return initState
    default:
      return state
  }
}

//action creators
export const setNotification = (message, time) => {
  return async dispatch  => {
    const timeout = setTimeout(() => dispatch(deleteNotification()), time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
      timeout
    })
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
    data: null
  }
}

export default notificationReducer