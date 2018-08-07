import React from 'react'
import { shallow, mount } from 'enzyme'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import { SearchResults, mapDispatchToProps, mapStateToProps } from '../index.js'
import apiKey from '../../../apiKey.js'
import * as mockData from '../../../__mocks__/mockData'
import * as actions from '../../../Actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('SearchResults', () => {
  let mockProps
  let searchResults

  beforeEach(() => {
    mockProps = {
      nextPageSuccess: [],
      resultsHaveErrored: false,
      resultsAreLoading: false,
      nextPageErrored: false,
      nextPageLoading: false,
      fetchFullText: jest.fn(),
      fetchNextPage: jest.fn(),
      resultsSuccess: mockData.articles
    }
    searchResults = shallow(<SearchResults {...mockProps} />)
  })

  it('should match snapshots', () => {
    expect(searchResults).toMatchSnapshot()
  })

  it('should match snapshot if results have errored', () => {
    mockProps.resultsHaveErrored = true
    searchResults = shallow(<SearchResults {...mockProps} />)

    expect(searchResults).toMatchSnapshot()
  })

  it('should match snapshot if next page has errored', () => {
    mockProps.nextPageErrored = true
    searchResults = shallow(<SearchResults {...mockProps} />)

    expect(searchResults).toMatchSnapshot()
  })

  it('should match snapshot when results are loading', () => {
    mockProps.resultsAreLoading = true
    searchResults = shallow(<SearchResults {...mockProps} />)

    expect(searchResults).toMatchSnapshot()
  })

  it('should match snapshot when next page is loading', () => {
    mockProps.nextPageLoading = true
    searchResults = shallow(<SearchResults {...mockProps} />)

    expect(searchResults).toMatchSnapshot()
  })


  it('should have default state', () => {
    const expected = {
      redirectToArticle: false,
      canUserPost: false,
      pageCounter: 1
    }

    expect(searchResults.state()).toEqual(expected)
  })

  describe('redirectToArticle', () => {
    it('should update state when article is clicked', () => {
      const link =
        searchResults.find('.link-to-article').at(0)

      link.simulate('click', { preventDefault: jest.fn() })

      expect(searchResults.state('redirectToArticle')).toEqual(true)
    })
  })

  describe('incrementPage', () => {
    it('should set state with next page number', () => {
      searchResults.instance().incrementPage()

      expect(searchResults.state().pageCounter).toEqual(2)
    });
  });

  describe('postArticle', () => {
    it('should update state if user is signed in', () => {
      searchResults = shallow(<SearchResults isUserSignedIn={true} {...mockProps} />)
      const mockEvent = { preventDefault: jest.fn() }
      searchResults.instance().postArticle(mockEvent, 1528143)

      expect(searchResults.state().canUserPost).toEqual(true)
    });
  });

  describe('cleanQueryRestuls', () => {
    it('should display download link if available', () => {
      searchResults.instance().cleanQueryResults()

      expect(searchResults.find('.download-url').length).toEqual(10)
    })
    it('should call postArticle when link is clicked', () => {
      const mockEvent = { preventDefault: jest.fn() }
      const postArticle = (searchResults.instance().postArticle = jest.fn())
      searchResults.find('.archive-article').at(0).simulate('click', mockEvent)

      expect(postArticle).toHaveBeenCalledTimes(1)
    });
  })

  describe('mapDispatchToProps', () => {
    afterEach(() => {
      fetchMock.reset()
      fetchMock.restore()
    })

    it('creates QUERY_RESULTS_SUCCESS when fetching article is done', () => {
      fetchMock.getOnce(
        `*`,
        {
          "data": mockData.fullText
        })
      const expectedActions = [
        {
          "articleLoading": true,
          "type": "FULL_ARTICLE_LOADING"
        },
        {
          "articleLoading": false,
          "type": "FULL_ARTICLE_LOADING"
        },
        {
          "result": mockData.fullText,
          "type": "FULL_ARTICLE_SUCCESS"
        }
      ]
      const store = mockStore({ data: {} })

      return store.dispatch(actions.fetchFullText()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates NEXT_PAGE_SUCCESS when fetching next page has been done', () => {
      fetchMock.getOnce(
        `*`,
        {
          "data": mockData.secondPage
        })
      const expectedActions = [
        {
          "nextPage": [],
          "type": "NEXT_PAGE_SUCCESS"
        },
        {
          "results": [],
          "type": "QUERY_RESULTS_SUCCESS"
        },
        {
          "nextPageHasErrored": false,
          "type": "NEXT_PAGE_ERRORED"
        },
        {
          "nextPageLoading": true,
          "type": "NEXT_PAGE_LOADING" 
        },
        {
          "nextPageLoading": false,
          "type": "NEXT_PAGE_LOADING"
        },
        {
          "nextPage": mockData.secondPage,
          "type": "NEXT_PAGE_SUCCESS"
        }
      ]
      const store = mockStore({ nextPage: {} })

      return store.dispatch(actions.fetchNextPage()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('mapStateToProps', () => {
    describe('resultsSuccess', () => {
      it('should return an array of results', () => {
        const mockState = {
          resultsSuccess: true,
          type: 'RESULTS_SUCCESS'
        }
        const expected = {
          resultsSuccess: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('resultsTotalHits', () => {
      it('should return a number describing total results', () => {
        const mockState = {
          resultsTotalHits: 58329,
          type: 'RESULTS_TOTAL_HITS'
        }

        const expected = {
          resultsTotalHits: 58329
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('resultsAreLoading', () => {
      it('should return true if results are loading', () => {

        const mockState = {
          resultsAreLoading: true,
          type: 'RESULTS_ARE_LOADING'
        }
        const expected = {
          resultsAreLoading: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('resultsHaveErrored', () => {
      it('should return true if results have errored', () => {

        const mockState = {
          resultsHaveErrored: true,
          type: 'RESULTS_HAVE_ERRORED'
        }

        const expected = {
          resultsHaveErrored: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('userAuthentication', () => {
      it('should return an array of user UID', () => {

        const mockState = {
          userAuthentication: ['982f89s98sw4xxs'],
          type: 'USER_AUTHENTICATION'
        }

        const expected = {
          userAuthentication: ['982f89s98sw4xxs']
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('userSignupSuccess', () => {
      it('should return true if user signup is a success', () => {

        const mockState = {
          userSignupSuccess: true,
          type: 'USER_SIGNUP_SUCCESS'
        }

        const expected = {
          userSignupSuccess: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('isUserSignedIn', () => {
      it('should return true if user is signed in', () => {

        const mockState = {
          isUserSignedIn: true,
          type: 'IS_USER_SIGNED_IN'
        }

        const expected = {
          isUserSignedIn: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('captureQuery', () => {
      it('should return user serach query as string', () => {

        const mockState = {
          captureQuery: 'query',
          type: 'CAPTURE_QUERY'
        }

        const expected = {
          captureQuery: 'query'
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('nextPageSuccess', () => {
      it('should return an array with articles on next page', () => {

        const mockState = {
          nextPageSuccess: [
            {
              title: 'article title',
              id: 5,
              description: 'article description'
            }
          ],
          type: 'NEXT_PAGE_SUCCESS'
        }

        const expected = {
          nextPageSuccess: [
            {
              title: 'article title',
              id: 5,
              description: 'article description'
            }
          ]
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('nextPageLoading', () => {
      it('should return true if next page is loading', () => {

        const mockState = {
          nextPageLoading: true,
          type: 'NEXT_PAGE_LOADING'
        }

        const expected = {
          nextPageLoading: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })

    describe('nextPageErrored', () => {
      it('should return true if next page has errored', () => {

        const mockState = {
          nextPageErrored: true,
          type: 'NEXT_PAGE_ERRORED'
        }

        const expected = {
          nextPageErrored: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })
  })
})
