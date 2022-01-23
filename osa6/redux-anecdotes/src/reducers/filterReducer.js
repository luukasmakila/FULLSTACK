const filterReducer = (state = {filter: ''}, action) => {
  switch(action.type){
    case 'SET_FILTER':
      console.log(action.data)
      return {...state, filter: action.data}
  default:
    return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    data: filter
  }
}

export default filterReducer