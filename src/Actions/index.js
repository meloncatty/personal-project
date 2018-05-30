import apiKey from '../apiKey.js'

export const resultsSuccess = (results) => ({
  type: 'QUERY_RESULTS_SUCCESS',
  results
})

export const resultsAreLoading = (bool) => ({
  type: 'RESULTS_ARE_LOADING',
  resultsLoading: bool
})

export const resultsHaveErrored = (bool) => ({
  type: 'RESULTS_HAVE_ERRORED',
  resultsErrored: bool
})

export const fetchArticles = (url) => {
  return async (dispatch) => {
    try {
      dispatch(resultsAreLoading(true))
      
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(resultsAreLoading(false))
      const articles = await response.json()
      dispatch(resultsSuccess(articles.data))
    } catch (error) {
      dispatch(resultsHaveErrored(true))
      dispatch(resultsAreLoading(false))
    }
  }
}