const filterReducer = (state = {filter: ''}, action) => {
  switch(action.type){
    case 'SET_FILTER':
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