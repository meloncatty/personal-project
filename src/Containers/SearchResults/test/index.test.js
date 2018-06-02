import React from 'react'
import { shallow } from 'enzyme'
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
    <SearchResults resultsSuccess={resultsSuccess}/>
  )

  expect(wrapper).toMatchSnapshot()
  })

  describe('cleanQueryResults', () => {
    it('should return an array of article information', () => {
      const resultsSuccess = [
        {
          id: 1,
          title: 'Test the things'
        }
      ]
      const wrapper = shallow(<SearchResults resultsSuccess={resultsSuccess} />)

      expect(wrapper.instance().cleanQueryResults()).toHaveLength(1)
    })
  })
})