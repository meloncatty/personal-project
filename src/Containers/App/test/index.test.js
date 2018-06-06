import React from 'react'
import {shallow} from 'enzyme'
import {App, mapStateToProps} from '../'

describe('App', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const wrapper = shallow(<App />)
    const expected = {
      user: null
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should return list of links for authenticated users', () => {
    const wrapper = shallow(<App isUserSignedIn />)

    expect(wrapper.find('li').length).toEqual(3)
  })

  it('should return list of links for non-authenticated users', () => {
    const wrapper = shallow(<App isUserSignedIn={false} />)

    expect(wrapper.find('li').length).toEqual(2)
  })

  it('should display notice to user that account has been created successfully', () => {
    const wrapper = shallow(<App userSignupSuccess />)

    expect(wrapper.find('.account-success').length).toEqual(1)
  })

  describe('mapStateToProps', () => {
    describe('userAuthentication', () => {
      it('should return an array with user information', () => {
        const wrapper = shallow(<App />)

        const mockState = {
          userAuthentication: ['L8Ko3dfZSeRVpAQPKUJJHUiF78C3'],
          type: 'USER_AUTHENTICATON'
        }

        const expected = {
          userAuthentication: ['L8Ko3dfZSeRVpAQPKUJJHUiF78C3']
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })
    describe('isUserSignedIn', () => {
      it('should return true if user is signed in', () => {
        const wrapper = shallow(<App />)

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

    describe('userSignupSuccess', () => {
      it('should return true if user signup is a success', () => {
        const wrapper = shallow(<App />)

        const mockState = {
          userSignupSuccess: true,
          type: 'USER_SIGNUP_SUCCESS'
        }

        const expected = {
          userSignupSuccess: true
        }

        const mappedProps = mapStateToProps(mockState)
        expect(mappedProps).toEqual(expected)
      })
    })
  })
})
