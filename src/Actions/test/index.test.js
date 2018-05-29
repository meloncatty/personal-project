import thunk from 'react-redux'
import {resultsSuccess, resultsAreLoading, resultsHaveErrored, fetchArticles} from '../'

describe('Article results actions', () => {
  let mockUrl
  let thunk
  let mockDispatch
  let mockQuery
  describe('resultsSuccess', () => {
    it("should return type QUERY_RESULTS_SUCCESS")
    const results = [{}]
    const expected = {
      type: 'QUERY_RESULTS_SUCCESS',
      results
    }

    expect(resultsSuccess(results)).toEqual(expected)
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
  describe('fetchArticles', async () => {
    it("should call fetch with correct parameters", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({})
        })
      })
      mockQuery = 'query'
      mockUrl = 'url.com'
      mockDispatch = jest.fn()

      const thunk = fetchArticles(mockUrl)
      await thunk(mockDispatch)
      
      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })

    it('should dispatch resultsSuccess if status is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({data: {}})
        });
      });
      mockQuery = 'query'
      mockUrl = 'url.com'
      mockDispatch = jest.fn()

      const thunk = fetchArticles(mockUrl);
      await thunk(mockDispatch);
      const expected = resultsSuccess([{}])
      expect(mockDispatch).toHaveBeenCalledWith(expected)
    });
  })
})