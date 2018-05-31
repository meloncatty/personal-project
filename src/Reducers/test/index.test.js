import {
  resultsSuccess,
  resultsHaveErrored,
  resultsAreLoading
} from '../index.js'

describe('Reducers', () => {
  describe('resultsSuccess', () => {
    it('should return default state when no action is passed', async () => {
      expect(resultsSuccess([], {})).toEqual([])
    })

    it('should update store with an array of articles ', () => {
      const expected = [
        {
          id: 1,
          title: 'The heart of a combinatorial model category'
        }
      ]
      const mockAction = {
        type: 'QUERY_RESULTS_SUCCESS',
        results: [
          {
            id: 1,
            title: 'The heart of a combinatorial model category'
          }
        ]
      }
        expect(resultsSuccess([], mockAction)).toEqual(expected)
    })
  })
  describe('resultsHaveErrored', () => {
    it('should return default state when no action is passed', () => {
      expect(resultsSuccess(false, {})).toEqual(false)
    })

    it('should update store if results have errored', () => {
      const expected = true
      const mockAction = {
        type: 'RESULTS_HAVE_ERRORED',
        resultsErrored: true
      }

      expect(resultsHaveErrored(false, mockAction)).toEqual(expected)
    })
  })
  describe('resultsAreLoading', () => {
    it('should return default state when no action is passed', () => {
      expect(resultsAreLoading(false, {})).toEqual(false)
    })

    it('should update store if results are loading', () => {
      const expected = true
      const mockAction = {
        type: 'RESULTS_ARE_LOADING',
        resultsLoading: true
      }

      expect(resultsAreLoading(false, mockAction)).toEqual(expected)
    });
  })
})