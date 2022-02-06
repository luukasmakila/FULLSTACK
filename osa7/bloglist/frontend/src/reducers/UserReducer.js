import services from '../utils/storage'

const userReducer = (state = null, action) => {
  switch(action.type){
    case 'SET_USER':
      return action.data
    case 'GET_USER':
      return action.data
    case 'REMOVE_USER':
      return action.data
    default:
      return {...state}
  }
}

export const removeUser = () => {
  return async dispatch => {
    await services.logoutUser()
    dispatch({
      type: 'REMOVE_USER',
      data: null
    })
  }
}

export const getUser = () => {
  return async dispatch => {
    const user = await services.loadUser()
    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}

export const setUser = (user) => {
  return async dispatch => {
    await services.saveUser(user)
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}


export default userReducer