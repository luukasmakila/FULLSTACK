const initState = {message: null,type: 'success', timeout: 0}

const notificationReducer = (state = initState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      clearTimeout(state.timeout)
      return state = {...state, message: action.data, notiType: action.notiType, timeoutID: action.timeout}
    case 'DELETE_NOTIFICATION':
      return initState
    default:
      return state
  }
}

//action creators
export const setNotification = (message, notiType, time) => {
  return async dispatch  => {
    const timeout = setTimeout(() => dispatch(deleteNotification()), time * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
      notiType: notiType,
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