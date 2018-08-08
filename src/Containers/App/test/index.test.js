import React from 'react'
import {shallow} from 'enzyme'
import {App, mapStateToProps} from '../'

describe('App', () => {
  let mockProps
  let app
  beforeEach(() => {
    mockProps = {
      isUserSignedIn: false,
      userSignupSuccess: false
    }
    app = shallow(<App {...mockProps}/>)
  })
  it('should match snapshot', () => {
    expect(app).toMatchSnapshot()
  })

  it('should match snapshot when user sign up is a success', () => {
    mockProps.userSignupSuccess = true
    app = shallow(<App {...mockProps} />)
    expect(app).toMatchSnapshot()
  })

  it('should match snapshot when user is signed in', () => {
    mockProps.isUserSignedIn = true
    app = shallow(<App {...mockProps} />)
    expect(app).toMatchSnapshot()
  });

  it('should have default state', () => {
    const expected = {
      user: null
    }

    expect(app.state()).toEqual(expected)
  })

  describe('mapStateToProps', () => {
    describe('userAuthentication', () => {
      it('should return an array with user information', () => {
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
