import React from 'react'
import { shallow } from 'enzyme'
import {UserDashboard, mapDispatchToProps, mapStateToProps} from '../'

describe('UserDashboard', () => {
  it('should match snapshot', () => {
    const mockSuccess = [{
      id: 1,
      title: 'title',
      description: 'description'
    }]
    const mockUser = ['9f9sv90b9z']
    const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const mockSuccess = [{
      id: 1,
      title: 'title',
      description: 'description'
    }]
    const mockUser = ['9f9sv90b9z']
    const expected = {
      storeArticles: []
    }
    const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

    expect(wrapper.state()).toEqual(expected)
  })

  it('should call fetchArticlesFromFirebase when mounted', () => {
    const mockSuccess = [{
      id: 1,
      title: 'title',
      description: 'description'
    }]
    const mockUser = ['9f9sv90b9z']
    const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

    expect(wrapper.instance().fetchArticlesFromFirebase).toHaveBeenCalled
  })

  describe('fetchArticlesFromFirebase', () => {
    it('should call fetchUserArticles', () => {
      const mockSuccess = [{
        id: 1,
        title: 'title',
        description: 'description'
      }]
      const mockUser = ['L8Ko3dfZSeRVpAQPKUJJHUiF78C3']
      const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

      expect(wrapper.instance().fetchUserArticles).toHaveBeenCalled
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with full article id', () => {
      const mockSuccess = [{
        id: 1,
        title: 'title',
        description: 'description'
      }]
      const mockUser = ['L8Ko3dfZ8C3']
      const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchUserArticles(82413678)

      expect(mockDispatch).toHaveBeenCalled
    })
  })

  describe('mapStateToProps', () => {
    describe('isUserSignedIn', () => {
      it('should return true if user is signed in', () => {
        const mockSuccess = [{
          id: 1,
          title: 'title',
          description: 'description'
        }]
        const mockUser = ['L8Ko3dfZ8C3']
        const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

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
        const mockSuccess = [{
          id: 1,
          title: 'title',
          description: 'description'
        }]
        const mockUser = ['L8Ko3dfZ8C3']
        const wrapper = shallow(<UserDashboard isUserSignedIn fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

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
        const mockSuccess = [{
          id: 1,
          title: 'title',
          description: 'description'
        }]
        const mockUser = ['L8Ko3dfZ8C3']
        const wrapper = shallow(<UserDashboard fetchUserArticles={jest.fn()} fetchUserArticleSuccess={[]} userAuthentication={mockUser} />)

        const mockState = {
          fetchUserArticlesSuccess: mockSuccess,
          type: 'FETCH_USER_ARTICLE_SUCCESS'
        }

        const expected = {
          fetchUserArticlesSuccess: mockSuccess
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })
  })
})
