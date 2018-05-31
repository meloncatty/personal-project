import thunk from 'react-redux'
import apiKey from '../../apiKey.js'
import {resultsSuccess, resultsAreLoading, resultsHaveErrored, fetchArticles} from '../'

describe('Article results actions', () => {
  let mockQuery
  let mockDispatch

  beforeEach(() => {
    mockQuery = 'url.com',
    mockDispatch = jest.fn()
  })

  describe('resultsSuccess', () => {
    it("should return type QUERY_RESULTS_SUCCESS", () => {
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

    it('should dispatch resultsAreLoading when response is OK', async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          ok: true,
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
          ok: false,
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
          ok: false,
        })
      })

      const expected = resultsAreLoading(false)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })

    it('should dispatch resultsAreLoading when first invoked', async () => {
      window.fetch = jest.fn()

      const expected = resultsAreLoading(true)
      const thunk = fetchArticles(mockQuery)
      await thunk(mockDispatch)

      expect(mockDispatch).toHaveBeenCalledWith(expected)
    })
  })
})
