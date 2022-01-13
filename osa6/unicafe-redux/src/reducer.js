const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action.type)
  let _state = {...state}
  switch (action.type) {
    case 'GOOD':
      _state.good = _state.good + 1
      return _state
    case 'OK':
      _state.ok = _state.ok + 1
      return _state
    case 'BAD':
      _state.bad = _state.bad + 1
      return _state
    case 'ZERO':
      _state.good = 0
      _state.ok = 0
      _state.bad = 0
      return _state
    default: return _state
  }
  
}

export default counterReducer