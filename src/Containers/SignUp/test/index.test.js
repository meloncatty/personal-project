import React from 'react'
import {shallow} from 'enzyme'
import {SignUp, mapDispatchToProps} from '../'
import {userSignupSuccess} from '../../../Actions'

describe('SignUp', () => {
  let signUp
  
  beforeEach(() => {
    signUp = shallow(<SignUp userSignupSuccess={jest.fn()} />)
  })

  it('should match snapshot', () => {
    expect(signUp).toMatchSnapshot()
  })

  it('should have default state', () => {
    const expected = {
      username: '',
      email: '',
      passwordAuth: '',
      password: '',
      error: null
    }

    expect(signUp.state()).toEqual(expected)
  })

  describe('handleSignUpChange', () => {
    it('should update username on change', () => {
      const mockEvent = {target: {name: 'username', value: 'username'}}

      signUp.find('.username').simulate('change', mockEvent)

      expect(signUp.state('username')).toEqual(mockEvent.target.value)
    })

    it('should update email on change', () => {
      const mockEvent = {target: {name: 'new-email', value: 'new-email'}}

      signUp.find('.new-email').simulate('change', mockEvent)

      expect(signUp.state('new-email')).toEqual(mockEvent.target.value)
    })

    it('should update passwordAuth on change', () => {
      const mockEvent = {target: {name: 'passwordAuth', value: 'password'}}

      signUp.find('.password-auth').simulate('change', mockEvent)

      expect(signUp.state('passwordAuth')).toEqual(mockEvent.target.value)
    })

    it('should update password on change', () => {
      const mockEvent = {target: {name: 'password', value: 'password'}}

      signUp.find('.password-sign-up').simulate('change', mockEvent)

      expect(signUp.state('password')).toEqual(mockEvent.target.value)
    })
  })

  describe('handleSignUpSubmit', () => {
    it.skip('should call userSignupSuccess with true', () => {
      const mockEvent = {preventDefault: () => {}}
      signUp.find('form').simulate('submit', mockEvent)

      expect(signUp.instance().props.userSignupSuccess).toHaveBeenCalledWith(true)
    })

    it.skip('should call history.push', () => {
      const mockEvent = {preventDefault: () => {}}
      signUp.find('form').simulate('submit', mockEvent)

      expect(signUp.instance().props.history).toHaveBeenCalled()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return false when user signs out', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = userSignupSuccess(true)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.userSignupSuccess(true)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
