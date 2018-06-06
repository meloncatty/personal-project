import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchResults, mapDispatchToProps, mapStateToProps } from '../index.js'
import {fetchFullText} from '../../../Actions'

describe('SearchResults', () => {
  it('should match snapshots', () => {
    const resultsSuccess = [
      {
        id: 1,
        title: 'Test the things'
      }
    ]
    const wrapper = shallow(
      <SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={resultsSuccess} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const resultsSuccess = [
      {
        id: 1,
        title: 'Test the things'
      }
    ]
    const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={resultsSuccess} />)
    const expected = {
      redirectToArticle: false,
      canUserPost: false,
      pageCounter: 1
    }

    expect(wrapper.state()).toEqual(expected)
  })

  describe('redirectToArticle', () => {
    it('should update state when article is clicked', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults fetchNextPage={fetchNextPage} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsTotalHits={100} nextPageSuccess={resultsSuccess} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults
      wrapper.find('button').simulate('click')

      expect(wrapper.state('pageCounter')).toEqual(2)
    })

    it('should call fetchNextPage when clicked', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults fetchNextPage={fetchNextPage} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsTotalHits={100} nextPageSuccess={resultsSuccess} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults
      wrapper.find('button').simulate('click')

      expect(wrapper.fetchNextPage).toHaveBeenCalled
    })
  })

  describe('displayErrorText', () => {
    it('should return error text when results error occurs', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults resultsHaveErrored fetchFullText={jest.fn()} fetchNextPage={jest.fn()} nextPageErrored nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)

      expect(wrapper.find('.error-container').length).toEqual(1)
    })

    it('should return error text when next page of results error occurs', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults nextPageErrored fetchFullText={jest.fn()} fetchNextPage={jest.fn()} nextPageErrored nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)

      expect(wrapper.find('.error-container').length).toEqual(1)
    })
  })

  describe('cleanQueryRestuls', () => {
    it('should call postArticle when Archive link is clicked', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'
        },
        {
          id: 1,
          title: 'Test the things'
        },
        {
          id: 1,
          title: 'Test the things'
        }
      ]
      const nextPageSuccess = []
      const postArticle = jest.fn()
      const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults()
      wrapper.find('.archive-article').get(0).onClick

      expect(wrapper.instance().postArticle).toHaveBeenCalled
    })

    it('should display download link if available', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',
          downloadUrl: 'download.url'
        },
        {
          id: 1,
          title: 'Test the things'
        }
      ]
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults()

      expect(wrapper.find('.download-url').length).toEqual(1)
    })

    it('should call redirectToArticle when article link is clicked', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'
        },
        {
          id: 1,
          title: 'Test the things'
        },
        {
          id: 1,
          title: 'Test the things'
        }
      ]
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults()
      wrapper.find('.link-to-article').get(0).onClick

      expect(wrapper.instance().redirectToArticle).toHaveBeenCalled
    })
  })

  describe('loadingStation', () => {
    it('should return loading animation when results are loading', () => {
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults
        nextPageSuccess={[]}
        resultsSuccess={[]}
        nextPageLoading
        fetchFullText={jest.fn()}
        fetchNextPage={jest.fn()}
      />)
      expect(wrapper.find('.loading-container').length).toEqual(1)
    })

    it('should return loading animation when next page of results are loading', () => {
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults
        nextPageSuccess={[]}
        resultsSuccess={[]}
        nextPageLoading
        fetchFullText={jest.fn()}
        fetchNextPage={jest.fn()}
      />)

      expect(wrapper.find('.loading-container').length).toEqual(1)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with full article id', () => {
      const wrapper = shallow(<SearchResults resultsSuccess={[]}
        nextPageSuccess={[]}
        fetchFullText={jest.fn()}
        fetchNextPage={jest.fn()}
      />)
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchFullText(15824379)

      expect(mockDispatch).toHaveBeenCalled
    })
  })

  describe("mapStateToProps", () => {
    describe("resultsSuccess", () => {
      it("should return an array of results", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)
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

    describe("resultsTotalHits", () => {
      it("should return a number describing total results", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)
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

    describe("resultsAreLoading", () => {
      it("should return true if results are loading", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

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

    describe("resultsHaveErrored", () => {
      it("should return true if results have errored", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

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

    describe("userAuthentication", () => {
      it("should return an array of user UID", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

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

    describe("userSignupSuccess", () => {
      it("should return true if user signup is a success", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

        const mockState = {
          userSignupSuccess: true,
          type: 'USER_SIGNUP_SUCCESS'
        }

        const expected = {
          userSignupSuccess: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      });
    })

    describe("isUserSignedIn", () => {
      it("should return true if user is signed in", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

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

    describe("captureQuery", () => {
      it("should return user serach query as string", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

        const mockState = {
          captureQuery: 'query',
          type: 'CAPTURE_QUERY'
        }

        const expected = {
          captureQuery: 'query'
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      });
    });

    describe("nextPageSuccess", () => {
      it("should return an array with articles on next page", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

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
      });
    });

    describe("nextPageLoading", () => {
      it("should return true if next page is loading", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

        const mockState = {
          nextPageLoading: true,
          type: 'NEXT_PAGE_LOADING'
        }

        const expected = {
          nextPageLoading: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      });
    });

    describe("nextPageErrored", () => {
      it("should return true if next page has errored", () => {
        const wrapper = shallow(<SearchResults nextPageSuccess={[]} fetchFullText={jest.fn()} fetchNextPage={jest.fn()} resultsSuccess={[]} />)

        const mockState = {
          nextPageErrored: true,
          type: 'NEXT_PAGE_ERRORED'
        }

        const expected = {
          nextPageErrored: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      });
    });
  })
})
