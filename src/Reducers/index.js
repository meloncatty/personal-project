import { combineReducers } from 'redux'


export const queryResults = (state = [], action) => {
  switch (action.type) {
    case 'QUERY_RESULTS':
      return [action.results]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  queryResults
})

export default rootReducer
