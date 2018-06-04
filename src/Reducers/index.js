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

export const fullArticleSuccess = (state = [], action) => {
  switch (action.type) {
    case 'FULL_ARTICLE_SUCCESS':
      return action.result
    default:
      return state
  }
}

export const fullArticleLoading = (state = false, action) => {
  switch (action.type) {
    case 'FULL_ARTICLE_LOADING':
      return action.articleLoading
    default:
      return state
  }
}

export const fullArticleErrored = (state = false, action) => {
  switch (action.type) {
    case 'FULL_ARTICLE_ERRORED':
      return action.articleErrored
    default:
      return state
  }
}

export const userAuthentication = (state = [], action) => {
  switch (action.type) {
    case 'USER_AUTHENTICATION':
      return [action.userAuth]
    default:
      return state
  }
}

export const captureUserArticles = (state = [], action) => {
  switch (action.type) {
    case 'CAPTURE_USER_ARTICLES':
      return [action.userArticles, ...state]
    default:
      return state
  }
}

export const isUserSignedIn = (state = false, action) => {
  switch (action.type) {
    case 'IS_USER_SIGNED_IN':
      return action.isUserSignedIn
    default:
      return state
  }
}

const rootReducer = combineReducers({
  resultsSuccess,
  resultsHaveErrored,
  resultsAreLoading,
  fullArticleSuccess,
  fullArticleLoading,
  fullArticleErrored,
  userAuthentication,
  captureUserArticles,
  isUserSignedIn
})

export default rootReducer
