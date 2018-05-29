import { combineReducers } from 'redux'


export const queryResultsSuccess = (state = [], action) => {
  switch (action.type) {
    case 'QUERY_RESULTS_SUCCESS':
      return [...action.results]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  queryResultsSuccess
})

export default rootReducer
