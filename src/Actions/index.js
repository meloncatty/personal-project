export const queryResultsSuccess = (results) => ({
  type: 'QUERY_RESULTS_SUCCESS',
  results
})

export const resultsAreLoading = (bool) => ({
  type: 'RESULTS_ARE_LOADING',
  bool
})

export const resultsHaveErrored = (bool) => ({
  type: 'RESULTS_HAVE_ERRORED',
  bool
})
