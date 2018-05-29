import { combineReducers } from 'redux'


export const resultsSuccess = (state = [], action) => {
  switch (action.type) {
    case 'QUERY_RESULTS_SUCCESS':
      return [...action.results]
    default:
      return state
  }
}

export const resultsHaveErrored = (state = false, action) => {
  switch (action.type) {
    case 'RESULTS_HAVE_ERRORED':
      return action.resultsErrored
    default:
      return state
  }
}

export const resultsAreLoading = (state = false, action) => {
  switch (action.type) {
    case 'RESULTS_ARE_LOADING':
      return action.resultsLoading
    default:
      return state
  }
}

const rootReducer = combineReducers({
  resultsSuccess,
  resultsHaveErrored,
  resultsAreLoading
})

export default rootReducer
