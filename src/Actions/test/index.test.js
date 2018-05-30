import thunk from 'react-redux'
import {resultsSuccess, resultsAreLoading, resultsHaveErrored, fetchArticles} from '../'

describe('Article results actions', () => {
  let mockUrl
  let mockDispatch

  beforeEach(() => {
    mockUrl = 'url.com',
    mockDispatch = jest.fn()
  })

  describe('resultsSuccess', () => {
    it("should return type QUERY_RESULTS_SUCCESS", () => {
    const results = [{}]
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

      const thunk = fetchArticles(mockUrl)
      await thunk(mockDispatch)

      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })

    it('should dispatch resultsSuccess when response is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: [{}]})
        })
      })
      const expected = resultsSuccess([{}])
      const thunk = fetchArticles(mockUrl)
      await thunk(mockDispatch)
      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsAreLoading when response is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve({data: [{}]})
        })
      })
      const expected = resultsAreLoading(false)
      const thunk = fetchArticles(mockUrl)
      await thunk(mockDispatch)
      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should disptach resultsHaveErrored if status is not OK', async() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: false,
          json: () => Promise.resolve()
        })
      })

      const expected = resultsHaveErrored(true)
      const thunk = fetchArticles(mockUrl)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsAreLoading when first invoked', async () => {
      const expected = resultsAreLoading(true)
      const thunk = fetchArticles(mockUrl)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })
  })
})