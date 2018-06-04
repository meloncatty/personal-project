import {apiKey} from '../apiKey.js'

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

export const fullArticleLoading = (bool) => ({
  type: 'FULL_ARTICLE_LOADING',
  articleLoading: bool
})

export const fullArticleErrored = (bool) => ({
  type: 'FULL_ARTICLE_ERRORED',
  articleErrored: bool
})

export const fullArticleSuccess = (result) => ({
  type: 'FULL_ARTICLE_SUCCESS',
  result
})

export const userAuthentication = (userData) => ({
  type: 'USER_AUTHENTICATION',
  userAuth: userData
})

export const isUserSignedIn = (bool) => ({
  type: 'IS_USER_SIGNED_IN',
  isUserSignedIn: bool
})

export const captureUserArticles = (articles) => ({
  type: 'CAPTURE_USER_ARTICLES',
  userArticles: articles
})

export const fetchArticles = (query) => {
  return async (dispatch) => {
    try {
      dispatch(resultsSuccess([]))
      dispatch(resultsHaveErrored(false))
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

export const fetchFullText = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fullArticleLoading(true))
      const url = `https://core.ac.uk:443/api-v2/articles/get/${id}?metadata=true&fulltext=true&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${apiKey}`
      const response = await fetch(url)
      if(!response.ok) {
        throw Error(response.statusText)
      }
      dispatch(fullArticleLoading(false))
      const article = await response.json()
      dispatch(fullArticleSuccess(article.data))
    } catch (error) {
      dispatch(fullArticleErrored(true))
      dispatch(fullArticleLoading(false))
    }
  }
}
