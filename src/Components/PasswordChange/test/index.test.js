import React from 'react'
import { PasswordChange } from '../'
import { shallow } from 'enzyme'

describe('PasswordChange', () => {
  let passwordChange

  beforeEach(() => {
    passwordChange = shallow(<PasswordChange />)
  })
  it('should match snapshot', () => {
    expect(passwordChange).toMatchSnapshot()
  })

  it('should have default state', () => {
    const expected = {
      password: '',
      passwordAuth: '',
      submitSuccessful: false,
      error: false
    }

    expect(passwordChange.state()).toEqual(expected)
  })

  it.skip('should update state on submit', () => {
    passwordChange.setState({ password: 'pass', passwordAuth: 'pass', submitSuccessful: false })
    const mockEvent = {preventDefault: jest.fn()}
    const expected = {
      password: '',
      passwordAuth: '',
      submitSuccessful: true,
      error: false
    }
    passwordChange.find('button').simulate('click', mockEvent)

    expect(passwordChange.state()).toEqual(expected)
  })

  it.skip('should prevent default', () => {
    passwordChange.setState({ password: 'pass', passwordAuth: 'pass' })
    const mockEvent = {preventDefault: jest.fn()}
    console.log(passwordChange.state())
    passwordChange.find('form').simulate('submit', mockEvent)

    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })

  describe('handleChange', () => {
    it('should update password on change', () => {
      const mockEvent = {target: {name: 'password', value: 'password'}}

      passwordChange.find('.password').simulate('change', mockEvent)

      expect(passwordChange.state('password')).toEqual(mockEvent.target.value)
    })

    it('should update passwordAuth on change', () => {
      const mockEvent = {target: {name: 'passwordAuth', value: 'passwordAuth'}}

      passwordChange.find('.password-confirm').simulate('change', mockEvent)

      expect(passwordChange.state('passwordAuth')).toEqual(mockEvent.target.value)
    })
  })
})
