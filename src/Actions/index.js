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

export const fetchArticles = (query) => {
  return async (dispatch) => {
    try {
      dispatch(resultsAreLoading(true))
      const url = `https://core.ac.uk:443/api-v2/articles/search/${query}?page=1&pageSize=10&metadata=true&fulltext=false&citations=true&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=${apiKey}`
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
