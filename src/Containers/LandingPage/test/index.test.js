import React from 'react'
import { shallow } from 'enzyme'
import { LandingPage, mapDispatchToProps } from '../'

describe('LandingPage', () => {
  it('should have default state', () => {
    const wrapper = shallow(<LandingPage fetchArticles={jest.fn()} />)
    const expected = {
      searchInput: '',
      redirectToSearch: false
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should handle change upon input change', () => {
    const wrapper = shallow(<LandingPage fetchArticles={jest.fn()} />)
    const mockEvent = { target: { value: 'query' } }

    wrapper.find('input').simulate('change', mockEvent)

    expect(wrapper.state('searchInput')).toEqual('query')
  })

  it('should call handleSubmit when form is submitted', () => {
    const mockFetchArticles = jest.fn()
    const wrapper = shallow(<LandingPage fetchArticles={mockFetchArticles} />)
    const mockPreventDefault = {preventDefault: jest.fn()}
    wrapper.instance().handleSubmit(mockPreventDefault)

    expect(wrapper.instance().handleSubmit).toHaveBeenCalled
  })

  it('should call fetchArticles when form is submitted', () => {
    const mockFetchArticles = jest.fn()
    const wrapper = shallow(
      <LandingPage fetchArticles={mockFetchArticles} />
    )
    const mockPreventDefault = {preventDefault: jest.fn()}
    wrapper.find('form').simulate('submit', mockPreventDefault)

    expect(mockFetchArticles).toHaveBeenCalled()
  })

  it('should update redirectToSearch when handleSubmit is called', () => {
    const mockFetchArticles = jest.fn()
    const wrapper = shallow(<LandingPage fetchArticles={mockFetchArticles} />)
    const mockPreventDefault = {preventDefault: jest.fn()}
    wrapper.find('form').simulate('submit', mockPreventDefault)

    expect(wrapper.state('redirectToSearch')).toBe(true)
  })

  describe('mapDispatchToProps', () => {
    it('should return an object', () => {
      const wrapper = shallow(<LandingPage fetchArticles={jest.fn()} />)
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchArticles([15824379])

      expect(mockDispatch).toHaveBeenCalled
    })
  })
})
