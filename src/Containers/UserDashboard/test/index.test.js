import React from 'react'
import { shallow } from 'enzyme'
import {UserDashboard, mapDispatchToProps, mapStateToProps} from '../'
import * as mockData from '../../../__mocks__/mockData'

describe('UserDashboard', () => {
  let mockProps
  let userDashboard

  beforeEach(() => {
    mockProps = {
      isUserSignedIn: false,
      fetchUserArticles: jest.fn(),
      fetchUserArticlesSuccess: mockData.fullText,
      userAuthentication: ['9f9sv90b9z']
    }
    userDashboard = shallow(<UserDashboard {...mockProps} />)
  })
  it('should match snapshot', () => {
    expect(userDashboard).toMatchSnapshot()
  })

  it('should have default state', () => {
    const expected = {
      storeArticles: []
    }

    expect(userDashboard.state()).toEqual(expected)
  })

  it('should call fetchArticlesFromFirebase when mounted', () => {
    const fetchArticlesFromFirebase = (userDashboard.instance().fetchArticlesFromFirebase = jest.fn())
    userDashboard.instance().componentDidMount()
    expect(fetchArticlesFromFirebase).toHaveBeenCalledTimes(1)
  })

  describe('fetchArticlesFromFirebase', () => {
    it.skip('should call fetchUserArticles', () => {
      userDashboard.instance().componentDidMount()

      expect(userDashboard.instance().props.fetchUserArticles).toHaveBeenCalledTimes(1)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with full article id', () => {
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchUserArticles(82413678)

      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  describe('mapStateToProps', () => {
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

    describe('fetchUserArticleSuccess', () => {
      it('should return an array of user articles', () => {
        const mockState = {
          fetchUserArticlesSuccess: mockData.fullText,
          type: 'FETCH_USER_ARTICLE_SUCCESS'
        }

        const expected = {
          fetchUserArticlesSuccess: mockData.fullText
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })
  })
})
