import React from 'react'
import { SignIn, mapDispatchToProps } from '../'
import { shallow } from 'enzyme'
import {userAuthentication, isUserSignedIn} from '../../../Actions'

describe('SignIn', () => {
  let mockProps
  let signIn
  beforeEach(() => {
    mockProps = {
      userAuthentication: jest.fn(),
      isUserSignedIn: jest.fn()
    }
    signIn = shallow(<SignIn {...mockProps} />)
  })
  it('should match snapshot', () => {
    expect(signIn).toMatchSnapshot()
  })

  it('should have default state', () => {
    const expected = {
      email: '',
      password: '',
      error: null
    }

    expect(signIn.state()).toEqual(expected)
  })

  it('should not submit form if fields are invalid', () => {
    const mockEvent = {target: {name: 'password', value: null}}

    signIn.find('.password-sign-in').simulate('change', mockEvent)

    expect(signIn.find('button').is('[disabled]')).toBe(true)
  })

  it.skip('should call history.push', () => {
    const mockEvent = { preventDefault: jest.fn() }

    signIn.find('form').simulate('submit', mockEvent)

    expect(signIn.instance().history).toHaveBeenCalled()
  })

  describe('handleSignInChange', () => {
    it('should handle password input change', () => {
      const mockEvent = {target: {name: 'password', value: 'password'}}

      signIn.find('.password-sign-in').simulate('change', mockEvent)

      expect(signIn.state('password')).toEqual(mockEvent.target.value)
    })

    it('should handle email input change', () => {
      const mockEvent = {target: {name: 'email', value: 'email'}}

      signIn.find('.email').simulate('change', mockEvent)

      expect(signIn.state('email')).toEqual(mockEvent.target.value)
    })
  })

  describe('handleSignInSubmit', () => {
    it.skip('should call userAuthentication', () => {
      signIn.setState({ email: 'email@gmail.com', password: 'password' })

      const mockEvent = { preventDefault: jest.fn() }

      signIn.find('form').simulate('submit', mockEvent)
      signIn.update()
      signIn.update()
      signIn.update()
      signIn.update()

      expect(signIn.instance().props.userAuthentication).toHaveBeenCalled()
    })

    it.skip('should call isUserSignedIn', () => {
      const mockEvent = { preventDefault: jest.fn() }
      signIn.find('form').simulate('submit', mockEvent)

      expect(signIn.instance().props.isUserSignedIn).toHaveBeenCalled()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with user UID when handleSignInSubmit is called', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = userAuthentication('userUID')
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.userAuthentication('userUID')

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call dispatch with true is user is signed in', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = isUserSignedIn(true)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.isUserSignedIn(true)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
