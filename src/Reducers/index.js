import { combineReducers } from 'redux'

const queryResults = (state = [], action) => {
  switch (action.type) {
    case 'QUERY_RESULTS':
      return [...state, action.results]
    default:
      return state
  }
}

const rootReducer = combineReducers({queryResults})

export default rootReducer
