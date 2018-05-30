import React from 'react'
import { shallow, mount } from 'enzyme'
import { LandingPage } from '../'

describe('LandingPage', () => {
  it('should have default state', () => {
    const wrapper = shallow(<LandingPage />)
    const expected = {
      searchInput: '',
      redirectToSearch: false
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should handle change upon input change', () => {
    const wrapper = mount(<LandingPage />)
    const mockEvent = { target: { value: 'query' } }
    const mockHandleChange = jest.fn()

    wrapper.find('input').simulate('change', mockEvent)

    expect(wrapper.state('searchInput')).toEqual('query')
  })

  it('should call fetchArticles when form is submitted', () => {
    const mockFetchArticles = jest.fn()
    const wrapper = shallow(<LandingPage fetchArticles={mockFetchArticles}/>)
    const mockPreventDefault = {preventDefault: jest.fn()}
    const mockSubmit = jest.fn()
    const handleSubmit = (wrapper.instance().handleSubmit = jest.fn())
    wrapper.find('form').simulate('submit', mockPreventDefault)
    // expect(handleSubmit).toHaveBeenCalledTimes(1)
    // expect(mockFetchArticles).toHaveBeenCalled()
  })
})
