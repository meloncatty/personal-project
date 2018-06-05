import { combineReducers } from 'redux'


export const resultsSuccess = (state = [], action) => {
  switch (action.type) {
    case 'QUERY_RESULTS_SUCCESS':
      return [...action.results]
    default:
      return state
  }
}

export const resultsTotalHits = (state = null, action) => {
  switch (action.type) {
    case 'RESULTS_TOTAL_HITS':
      return action.totalHits
    default:
      return state
  }
}

export const captureQuery = (state = null, action) => {
  switch (action.type) {
    case 'CAPTURE_QUERY':
      return action.userQuery
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

export const userSignupSuccess = (state = false, action) => {
  switch (action.type) {
    case 'USER_SIGNUP_SUCCESS':
      return action.signupSuccess
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

export const fetchUserArticlesSuccess = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USER_ARTICLES_SUCCESS':
      return [action.fetchedArticles, ...state]
    default:
      return state
  }
}

export const fetchUserArticlesLoading = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_USER_ARTICLES_LOADING':
      return action.fetchUserArticlesLoading
    default:
      return state
  }
}

export const fetchUserArticlesErrored = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_USER_ARTICLES_ERRORED':
      return action.fetchUserArticlesErrored
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

export const nextPageLoading = (state = false, action) => {
  switch (action.type) {
    case 'NEXT_PAGE_LOADING':
      return action.nextPageLoading
    default:
      return state
  }
}

export const nextPageErrored = (state = false, action) => {
  switch (action.type) {
    case 'NEXT_PAGE_ERRORED':
      return action.nextPageHasErrored
    default:
      return state
  }
}

export const nextPageSuccess = (state = [], action) => {
  switch (action.type) {
    case 'NEXT_PAGE_SUCCESS':
      return [...action.nextPage]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  resultsSuccess,
  resultsHaveErrored,
  resultsAreLoading,
  resultsTotalHits,
  captureQuery,
  nextPageLoading,
  nextPageErrored,
  nextPageSuccess,
  fullArticleSuccess,
  fullArticleLoading,
  fullArticleErrored,
  userAuthentication,
  captureUserArticles,
  isUserSignedIn,
  userSignupSuccess,
  fetchUserArticlesSuccess,
  fetchUserArticlesLoading,
  fetchUserArticlesErrored
})

export default rootReducer
