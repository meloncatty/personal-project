import React from 'react'
import { shallow, mount } from 'enzyme'
import { SearchResults } from '../index.js'

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
    it("should display error text when errors occur", () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things',

        }
      ]
      const fetchNextPage = jest.fn()
      const wrapper = mount(<SearchResults resultsHaveErrored={true} nextPageErrored={true} nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)

      expect(wrapper.instance().dispalyErrorText).toHaveBeenCalled
    })
  })

  describe("cleanQueryRestuls", () => {
    const resultsSuccess = [
      {
        id: 1,
        title: 'Test the things',

      }
    ]
    const fetchNextPage = jest.fn()
    const wrapper = mount(<SearchResults userAuthentication={[0]} fetchNextPage={fetchNextPage} nextPageSuccess={[]} resultsSuccess={resultsSuccess} />)
    wrapper.instance().cleanQueryResults
    wrapper.find('.archive-denied').simulate('click')

    expect(wrapper.fetchNextPage).toHaveBeenCalled
  });
})
