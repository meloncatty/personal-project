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
    landingPage = shallow(<LandingPage {...mockProps}/>) 
  })

  it('should match snapshot', () => {
    expect(landingPage).toMatchSnapshot()
  })

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

  describe('handleSubmit', () => {
    it('should call fetchArticles with correct parameters', () => {
      const mockPreventDefault = {preventDefault: jest.fn()}

      landingPage.setState({ searchInput: 'aliens' })
      landingPage.find('form').simulate('submit', mockPreventDefault)

      expect(landingPage.instance().props.fetchArticles).toHaveBeenCalledWith('aliens')
    })

    it('should update state of component', () => {
      const expected = {
        redirectToSearch: true,
        searchInput: ''
      }      
      const mockPreventDefault = {preventDefault: jest.fn()}
      landingPage.setState({ searchInput: 'aliens' })
      landingPage.find('form').simulate('submit', mockPreventDefault)

      expect(landingPage.state()).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return an object', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchArticles('aliens')

      expect(mockDispatch).toHaveBeenCalled()
    })
  })
})
