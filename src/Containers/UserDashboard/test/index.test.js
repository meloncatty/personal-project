import React from 'react'
import {shallow, mount} from 'enzyme'
import {UserDashboard, mapDispatchToProps} from '../'
import {fetchUserArticles} from '../../../Actions'

describe('UserDashboard', () => {
  it('should match snapshot', () => {
    const mockSuccess = [{
      id: 1,
      title: 'title',
      description: 'description'
    }]
    const mockUser = ['9f9sv90b9z']
    const expected = {
      storeArticles: []
    }
    const wrapper = shallow(<UserDashboard isUserSignedIn={true} fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

    expect(wrapper).toMatchSnapshot()
  });

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
    const wrapper = shallow(<UserDashboard isUserSignedIn={true} fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)

    expect(wrapper.state()).toEqual(expected)
  });

  it('should call fetchArticlesFromFirebase when mounted', () => {
    const mockSuccess = [{
      id: 1,
      title: 'title',
      description: 'description'
    }]
    const mockUser = ['9f9sv90b9z']
    const expected = {
      storeArticles: []
    }
    const wrapper = shallow(<UserDashboard isUserSignedIn={true} fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)
    
    expect(wrapper.instance().fetchArticlesFromFirebase).toHaveBeenCalled
  });

  describe('fetchArticlesFromFirebase', () => {
    it('should call fetchUserArticles', () => {
      const mockSuccess = [{
        id: 1,
        title: 'title',
        description: 'description'
      }]
      const mockUser = ['L8Ko3dfZSeRVpAQPKUJJHUiF78C3']
      const expected = {
        storeArticles: []
      }
      const wrapper = shallow(<UserDashboard isUserSignedIn={true} fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)
      
      expect(wrapper.instance().fetchUserArticles).toHaveBeenCalled
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with full article id', () => {
      const mockSuccess = [{
        id: 1,
        title: 'title',
        description: 'description'
      }]
      const mockUser = ['L8Ko3dfZ8C3']
      const expected = {
        storeArticles: []
      }
      const wrapper = shallow(<UserDashboard isUserSignedIn={true} fetchUserArticles={jest.fn()} fetchUserArticleSuccess={mockSuccess} userAuthentication={mockUser} />)
      const mockDispatch = jest.fn()
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.fetchUserArticles(82413678)
      
      expect(mockDispatch).toHaveBeenCalled
    });    
  });
});