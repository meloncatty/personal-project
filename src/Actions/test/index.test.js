import thunk from 'react-redux'
import {apiKey} from '../../apiKey.js'
import {
  resultsSuccess,
  resultsAreLoading,
  resultsHaveErrored,
  resultsTotalHits,
  fetchArticles,
  fullArticleSuccess,
  fullArticleLoading,
  fullArticleErrored,
  fetchFullText,
  fetchUserArticlesSuccess,
  fetchUserArticlesLoading,
  fetchUserArticlesErrored,
  fetchUserArticles,
  nextPageLoading,
  nextPageErrored,
  nextPageSuccess,
  fetchNextPage,
  userSignupSuccess,
  captureUserArticles,
  captureQuery,
  isUserSignedIn,
  userAuthentication
} from '../'

describe('Article search results actions', () => {
  let mockQuery
  let mockDispatch

  beforeEach(() => {
    mockQuery = 'query',
    mockDispatch = jest.fn()
  })

  describe('resultsSuccess', () => {
    it('should return type QUERY_RESULTS_SUCCESS', () => {
      const results = [{id: 0, title: 'do some testing'}]
      const expected = {
        type: 'QUERY_RESULTS_SUCCESS',
        results
      }

      expect(resultsSuccess(results)).toEqual(expected)
    })
  })
  describe('resultsAreLoading', () => {
    it('should return type RESULTS_ARE_LOADING', () => {
      const expected = {
        type: 'RESULTS_ARE_LOADING',
        resultsLoading: false
      }

      expect(resultsAreLoading(false)).toEqual(expected)
    })
  })
  describe('resultsHaveErrored', () => {
    it('should return type RESULTS_HAVE_ERRORED', () => {
      const expected = {
        type: 'RESULTS_HAVE_ERRORED',
        resultsErrored: false
      }

      expect(resultsHaveErrored(false)).toEqual(expected)
    })
  })

  describe('fetchArticles', () => {
    it('should call fetch with correct parameters', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      })
      const url = `https://core.ac.uk:443/api-v2/articles/search/${mockQuery}?page=1&pageSize=10&metadata=true&fulltext=false&citations=true&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=${apiKey}`
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(window.fetch).toHaveBeenCalledWith(url)
    })

    it('should dispatch resultsSuccess when response is OK', async () => {
      const mockData = [{id: 0, title: 'Learning about things'}]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: mockData})
        })
      })
      const expected = resultsSuccess(mockData)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsTotalHits when response is OK', async () => {
      const mockData = [{id: 0, title: 'Learning about things', totalHits: 2929}]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: mockData})
        })
      })
      const expected = resultsTotalHits(mockData.totalHits)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsAreLoading when response is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true
          // json: () => Promise.resolve({data: [{}]})
        })
      })
      const expected = resultsAreLoading(false)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)
      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should disptach resultsHaveErrored if status is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })

      const expected = resultsHaveErrored(true)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsAreLoading if status is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })

      const expected = resultsAreLoading(false)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsAreLoading when first invoked', async () => {
      const expected = resultsAreLoading(true)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })
  })
})

describe('Full article result actions', () => {
  describe('fullArticleLoading', () => {
    it('should return type FULL_ARTICLE_LOADING', () => {
      const expected = {
        type: 'FULL_ARTICLE_LOADING',
        articleLoading: false
      }

      expect(fullArticleLoading(false)).toEqual(expected)
    })
  })
  describe('fullArticleErrored', () => {
    it('should return type FULL_ARTICLE_ERRORED', () => {
      const expected = {
        type: 'FULL_ARTICLE_ERRORED',
        articleErrored: false
      }

      expect(fullArticleErrored(false)).toEqual(expected)
    })
  })
  describe('fullArticleSuccess', () => {
    it('should return type FULL_ARTICLE_SUCCESS', () => {
      const result = [
        {
          id: 0,
          title: 'article title',
          description: 'article description'
        }
      ]
      const expected = {
        type: 'FULL_ARTICLE_SUCCESS',
        result
      }

      expect(fullArticleSuccess(result)).toEqual(expected)
    })
  })

  describe('fetchFullText', () => {
    let mockId
    let mockDispatch

    beforeEach(() => {
      mockId = '46604043',
      mockDispatch = jest.fn()
    })

    it('should call fetch with the correct parameters', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      })
      const url = `https://core.ac.uk:443/api-v2/articles/get/${mockId}?metadata=true&fulltext=true&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${apiKey}`
      const thunk = fetchFullText(mockId)
      await thunk(mockDispatch)

      expect(window.fetch).toHaveBeenCalledWith(url)
    })

    it('should dispatch fullArticleLoading when first invoked', async () => {
      const expected = fullArticleLoading(true)
      const thunk = fetchFullText(mockId)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fullArticleSuccess when response is OK', async () => {
      const mockData = [
        {
          id: 0,
          title: 'Learning about things',
          fullText: 'full text'
        }
      ]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: mockData})
        })
      })
      const expected = fullArticleSuccess(mockData)
      const thunk = fetchFullText(mockId)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fullArticleLoading when response is OK', async () => {
      const mockData = [
        {
          id: 1,
          title: 'title',
          fullText: 'full text'
        }
      ]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: mockData})
        })
      })
      const expected = fullArticleLoading(false)
      const thunk = fetchFullText(mockId)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fullArticleErrored when response is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })

      const expected = fullArticleErrored(true)
      const thunk = fetchFullText(mockId)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fullArticleLoading when response is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })

      const expected = fullArticleLoading(false)
      const thunk = fetchFullText(mockId)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })
  })
})

describe('Fetch user articles actions', () => {
  describe('fetchUserArticlesSuccess', () => {
    it('should return type FETCH_USER_ARTICLES_SUCCESS', () => {
      const fetchedArticles = [
        {
          id: 1,
          title: 'article title',
          description: 'article description'
        }
      ]
      const expected = {
        type: 'FETCH_USER_ARTICLES_SUCCESS',
        fetchedArticles
      }

      expect(fetchUserArticlesSuccess(fetchedArticles)).toEqual(expected)
    })
  })

  describe('fetchUserArticlesLoading', () => {
    it('should return type FETCH_USER_ARTICLES_LOADING', () => {
      const expected = {
        type: 'FETCH_USER_ARTICLES_LOADING',
        fetchUserArticlesLoading: false
      }

      expect(fetchUserArticlesLoading(false)).toEqual(expected)
    })
  })

  describe('fetchUserArticlesErrored', () => {
    it('should return type FETCH_USER_ARTICLES_ERRORED', () => {
      const expected = {
        type: 'FETCH_USER_ARTICLES_ERRORED',
        fetchUserArticlesErrored: false
      }

      expect(fetchUserArticlesErrored(false)).toEqual(expected)
    })
  })

  describe('fetchUserArticles', () => {
    let mockId
    let mockDispatch
    let thunk

    beforeEach(() => {
      mockId = '46604043',
      mockDispatch = jest.fn()
      thunk = fetchUserArticles(mockId)
    })

    it('should call fetch with the correct parameters', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      })
      const url = `https://core.ac.uk:443/api-v2/articles/get/${mockId}?metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${apiKey}`
      await thunk(mockDispatch)

      expect(window.fetch).toHaveBeenCalledWith(url)
    })

    it('should dispatch fetchUserArticlesErrored when first invoked', async () => {
      const expected = fetchUserArticlesErrored(false)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fetchUserArticlesLoading when first invoked', async () => {
      const expected = fetchUserArticlesLoading(true)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fetchUserArticlesSuccess when response is OK', async () => {
      const mockArticle = [
        {
          id: 0,
          title: 'Learning about things',
          fullText: 'full text'
        }
      ]

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: mockArticle})
        })
      })
      const expected = fetchUserArticlesSuccess(mockArticle)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fetchUserArticlesLoading when response is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true
        })
      })

      const expected = fetchUserArticlesLoading(false)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fetchUserArticlesErrored when response is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })

      const expected = fetchUserArticlesErrored(true)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch fetchUserArticlesLoading when response is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })

      const expected = fetchUserArticlesLoading(false)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })
  })
})

describe('Next page actions', () => {
  describe('nextPageSuccess', () => {
    it('should return type NEXT_PAGE_SUCCESS', () => {
      const nextPage = [
        {
          id: 1,
          title: 'article title',
          description: 'article description'
        }
      ]
      const expected = {
        type: 'NEXT_PAGE_SUCCESS',
        nextPage
      }

      expect(nextPageSuccess(nextPage)).toEqual(expected)
    })
  })

  describe('nextPageLoading', () => {
    it('should return type NEXT_PAGE_LOADING', () => {
      const expected = {
        type: 'NEXT_PAGE_LOADING',
        nextPageLoading: false
      }

      expect(nextPageLoading(false)).toEqual(expected)
    })
  })

  describe('nextPageErrored', () => {
    it('should return type NEXT_PAGE_ERRORED', () => {
      const expected = {
        type: 'NEXT_PAGE_ERRORED',
        nextPageHasErrored: false
      }

      expect(nextPageErrored(false)).toEqual(expected)
    })
  })

  describe('fetchNextPage', () => {
    let mockQuery
    let mockDispatch
    let mockPageNum
    let thunk

    beforeEach(() => {
      mockQuery = 'query',
      mockPageNum = 3
      mockDispatch = jest.fn()
      thunk = fetchNextPage(mockQuery, mockPageNum)
    })

    it('should call fetch with the correct parameters', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      })
      const url = `https://core.ac.uk:443/api-v2/articles/search/${mockQuery}?page=${mockPageNum}&pageSize=10&metadata=true&fulltext=false&citations=true&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=${apiKey}`
      await thunk(mockDispatch)

      expect(window.fetch).toHaveBeenCalledWith(url)
    })

    it('should dispatch nextPageSuccess when first invoked', async () => {
      const expected = nextPageSuccess([])
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsSuccess when first invoked', async () => {
      const expected = resultsSuccess([])
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch nextPageErrored when first invoked', async () => {
      const expected = nextPageErrored(false)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch nextPageLoading when first invoked', async () => {
      const expected = nextPageLoading(true)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch nextPageSuccess when response is OK', async () => {
      const mockArticle = [
        {
          id: 0,
          title: 'Learning about things',
          fullText: 'full text'
        }
      ]

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: mockArticle})
        })
      })
      const expected = nextPageSuccess(mockArticle)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch nextPageLoading when response is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true
        })
      })
      const expected = nextPageLoading(false)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch nextPageErrored when response is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })
      const expected = nextPageErrored(true)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch nextPageLoading when response is not OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 500,
          ok: false
        })
      })
      const expected = nextPageLoading(false)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })
  })
})

describe('User actions', () => {
  describe('captureQuery', () => {
    it('should return type CAPTURE_QUERY', () => {
      const userQuery = 'blockchain'
      const expected = {
        type: 'CAPTURE_QUERY',
        userQuery
      }

      expect(captureQuery(userQuery)).toEqual(expected)
    })
  })

  describe('userAuthentication', () => {
    it('should return type USER_AUTHENTICATION', () => {
      const userUid = '9910109xfvn8'
      const expected = {
        type: 'USER_AUTHENTICATION',
        userAuth: userUid
      }

      expect(userAuthentication(userUid)).toEqual(expected)
    })
  })

  describe('isUserSignedIn', () => {
    it('should return type IS_USER_SIGNED_IN', () => {
      const expected = {
        type: 'IS_USER_SIGNED_IN',
        isUserSignedIn: false
      }

      expect(isUserSignedIn(false)).toEqual(expected)
    })
  })

  describe('userSignupSuccess', () => {
    it('should return type USER_SIGNUP_SUCCESS', () => {
      const expected = {
        type: 'USER_SIGNUP_SUCCESS',
        signupSuccess: false
      }

      expect(userSignupSuccess(false)).toEqual(expected)
    })
  })

  describe('captureUserArticles', () => {
    it('should return type CAPTURE_USER_ARTICLES', () => {
      const userArticles = ['1993891', '1093949']
      const expected = {
        type: 'CAPTURE_USER_ARTICLES',
        userArticles
      }

      expect(captureUserArticles(userArticles)).toEqual(expected)
    })
  })
})
