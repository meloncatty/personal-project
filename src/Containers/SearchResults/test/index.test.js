import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchResults, mapDispatchToProps } from '../index.js'
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
    <SearchResults nextPageSuccess={[]} resultsSuccess={resultsSuccess}/>
  )

  expect(wrapper).toMatchSnapshot()
  })

  it("should have default state", () => {
    const resultsSuccess = [
      {
        id: 1,
        title: 'Test the things'
      }
    ]
    const wrapper = shallow(<SearchResults nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)
    const expected = {
      redirectToArticle: false,
      canUserPost: false,
      pageCounter: 1
    }

    expect(wrapper.state()).toEqual(expected)
  })

  describe('redirectToArticle', () => {
    it("should update state when article is clicked", () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults fetchNextPage={fetchNextPage} resultsTotalHits={100} nextPageSuccess={resultsSuccess} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults
      wrapper.find('button').simulate('click')

      expect(wrapper.state('pageCounter')).toEqual(2)
    })

    it("should call fetchNextPage when clicked", () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults fetchNextPage={fetchNextPage} resultsTotalHits={100} nextPageSuccess={resultsSuccess} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults
      wrapper.find('button').simulate('click')

      expect(wrapper.fetchNextPage).toHaveBeenCalled
    });
  })

  describe("displayErrorText", () => {
    it("should return error text when results error occurs", () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults resultsHaveErrored={true} nextPageErrored={true} nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)

      expect(wrapper.find('.error-container').length).toEqual(1)
    })

    it("should return error text when next page of results error occurs", () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults nextPageErrored={true} nextPageErrored={true} nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)

      expect(wrapper.find('.error-container').length).toEqual(1)
    })
  })

  describe("cleanQueryRestuls", () => {
    it('should call postArticle when Archive link is clicked', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',
        },
        {
          id: 1,
          title: 'Test the things',
        },
        {
          id: 1,
          title: 'Test the things',
        }
      ]
      const nextPageSuccess = []
      const postArticle = jest.fn()
      const wrapper = shallow(<SearchResults nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults()
      wrapper.find('.archive-article').get(0).onClick
      
      
      expect(wrapper.instance().postArticle).toHaveBeenCalled
    });

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
      const wrapper = shallow(<SearchResults nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults()
      
      expect(wrapper.find('.download-url').length).toEqual(1)
    });

    it('should call redirectToArticle when article link is clicked', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',
        },
        {
          id: 1,
          title: 'Test the things',
        },
        {
          id: 1,
          title: 'Test the things',
        }
      ]
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)
      wrapper.instance().cleanQueryResults()
      wrapper.find('.link-to-article').get(0).onClick
      
      expect(wrapper.instance().redirectToArticle).toHaveBeenCalled
    });
  });
  
  describe('loadingStation', () => {
    it('should return loading animation when results are loading', () => {
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults 
        nextPageSuccess={[]}
        resultsSuccess={[]} 
        resultsAreLoading={true}
      />)

      expect(wrapper.find('.loading-container').length).toEqual(1)
    });

    it('should return loading animation when next page of results are loading', () => {
      const nextPageSuccess = []
      const wrapper = shallow(<SearchResults 
        nextPageSuccess={[]}
        resultsSuccess={[]} 
        nextPageLoading={true}
      />)

      expect(wrapper.find('.loading-container').length).toEqual(1)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with full article id', () => {
      
      const wrapper = shallow(<SearchResults resultsSuccess={[]} 
        nextPageSuccess={[]}/>)
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchFullText(15824379)

      expect(mockDispatch).toHaveBeenCalled
    });
  })
})
