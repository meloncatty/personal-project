import React from 'react'
import {shallow} from 'enzyme'
import {SignUp, mapDispatchToProps} from '../'
import {userSignupSuccess} from '../../../Actions'

describe('SignUp', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
    const expected = {
      username: '',
      email: '',
      passwordAuth: '',
      password: '',
      error: null
    }

    expect(wrapper.state()).toEqual(expected)
  })

  describe('handleSignUpChange', () => {
    it('should update username on change', () => {
      const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
      const mockEvent = {target: {name: 'username', value: 'username'}}

      wrapper.find('.username').simulate('change', mockEvent)

      expect(wrapper.state('username')).toEqual(mockEvent.target.value)
    })

    it('should update email on change', () => {
      const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
      const mockEvent = {target: {name: 'new-email', value: 'new-email'}}

      wrapper.find('.new-email').simulate('change', mockEvent)

      expect(wrapper.state('new-email')).toEqual(mockEvent.target.value)
    })

    it('should update passwordAuth on change', () => {
      const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
      const mockEvent = {target: {name: 'passwordAuth', value: 'password'}}

      wrapper.find('.password-auth').simulate('change', mockEvent)

      expect(wrapper.state('passwordAuth')).toEqual(mockEvent.target.value)
    })

    it('should update password on change', () => {
      const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
      const mockEvent = {target: {name: 'password', value: 'password'}}

      wrapper.find('.password-sign-up').simulate('change', mockEvent)

      expect(wrapper.state('password')).toEqual(mockEvent.target.value)
    })
  })

  describe('handleSignUpSubmit', () => {
    it('should call userSignupSuccess with true', () => {
      const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
      const mockEvent = {preventDefault: () => {}}
      wrapper.find('form').simulate('submit', mockEvent)

      expect(wrapper.instance().userSignupSuccess).toHaveBeenCalled
    })

    it('should call history.push', () => {
      const history = {push: () => {}}
      const mockEvent = {preventDefault: () => {}}
      const wrapper = shallow(<SignUp history={history} userSignupSuccess={jest.fn()} />)
      wrapper.find('form').simulate('submit', mockEvent)

      expect(wrapper.instance().history).toHaveBeenCalled
    })
  })

  describe('mapDispatchToProps', () => {
    it('should return false when user signs out', () => {
      const wrapper = shallow(<SignUp userSignupSuccess={jest.fn()} />)
      const mockDispatch = jest.fn()
      const actionToDispatch = userSignupSuccess(true)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.userSignupSuccess(true)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
