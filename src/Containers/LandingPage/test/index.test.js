import React from 'react'
import { shallow } from 'enzyme'
import { LandingPage, mapDispatchToProps } from '../'

describe('LandingPage', () => {
  let mockProps
  let landingPage

  beforeEach(() => {
    mockProps = {
      fetchArticles: jest.fn()
    }
    landingPage = shallow(<LandingPage {...mockProps} />) 
  })

  it('should match snapshot', () => {
    expect(landingPage).toMatchSnapshot()
  });

  it('should have default state', () => {
    const expected = {
      searchInput: '',
      redirectToSearch: false
    }

    expect(landingPage.state()).toEqual(expected)
  })

  it('should handle change upon input change', () => {
    const mockEvent = { target: { value: 'query' } }

    landingPage.find('input').simulate('change', mockEvent)

    expect(landingPage.state('searchInput')).toEqual('query')
  })

  it('should call handleSubmit when form is submitted', () => {
    const mockPreventDefault = {preventDefault: jest.fn()}
    landingPage.instance().handleSubmit(mockPreventDefault)

    expect(landingPage.instance().handleSubmit).toHaveBeenCalled
  })

  it('should call fetchArticles when form is submitted', () => {
    const mockFetchArticles = (landingPage.instance().handleSubmit = jest.fn())
    const mockPreventDefault = {preventDefault: jest.fn()}

    landingPage.find('button').simulate('submit', mockPreventDefault)
    landingPage.instance().handleSubmit()

    expect(mockFetchArticles).toHaveBeenCalledTimes(1)
  })

  it('should update redirectToSearch when handleSubmit is called', () => {
    const mockPreventDefault = {preventDefault: jest.fn()}
    landingPage.find('form').simulate('submit', mockPreventDefault)

    expect(landingPage.state('redirectToSearch')).toBe(true)
  })

  describe('mapDispatchToProps', () => {
    it('should return an object', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchArticles([15824379])

      expect(mockDispatch).toHaveBeenCalled
    })
  })
})
