import React from 'react'
import { SignIn, mapDispatchToProps } from '../'
import { shallow } from 'enzyme'
import {userAuthentication, isUserSignedIn} from '../../../Actions'

describe('SignIn', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SignIn />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const wrapper = shallow(<SignIn />)
    const expected = {
      email: '',
      password: '',
      error: null
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should not submit form if fields are invalid', () => {
    const wrapper = shallow(<SignIn />)
      const mockEvent = {target: {name: 'password', value: null}}

      wrapper.find('.password-sign-in').simulate('change', mockEvent)

      expect(wrapper.find('button').is('[disabled]')).toBe(true)
  })

  describe('handleSignInChange', () => {
    it('should handle password input change', () => {
      const wrapper = shallow(<SignIn />)
      const mockEvent = {target: {name: 'password', value: 'password'}}

      wrapper.find('.password-sign-in').simulate('change', mockEvent)

      expect(wrapper.state('password')).toEqual(mockEvent.target.value)
    })

    it('should handle email input change', () => {
      const wrapper = shallow(<SignIn />)
      const mockEvent = {target: {name: 'email', value: 'email'}}

      wrapper.find('.email').simulate('change', mockEvent)

      expect(wrapper.state('email')).toEqual(mockEvent.target.value)
    })
  })

  describe('handleSignInSubmit', () => {
    it('should call userAuthentication', () => {
      const wrapper = shallow(<SignIn />)
      wrapper.instance().handleSignInSubmit

      expect(wrapper.instance().userAuthentication).toHaveBeenCalled
    })

    it('should call isUserSignedIn', () => {
      const wrapper = shallow(<SignIn />)
      wrapper.instance().handleSignInSubmit

      expect(wrapper.instance().isUserSignedIn).toHaveBeenCalled
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch with user UID when handleSignInSubmit is called', () => {
      const wrapper = shallow(<SignIn />)
      const mockDispatch = jest.fn()
      const actionToDispatch = userAuthentication('userUID')
      const mockEvent = {preventDefault: () => {}}
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.userAuthentication('userUID')

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });

    it('should call dispatch with true is user is signed in', () => {
      const wrapper = shallow(<SignIn />)
      const mockDispatch = jest.fn()
      const actionToDispatch = isUserSignedIn(true)
      const mockEvent = {preventDefault: () => {}}
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.isUserSignedIn(true)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
})