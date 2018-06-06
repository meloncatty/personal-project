import React from 'react'
import { PasswordForget } from '../'
import { shallow } from 'enzyme'

describe('PasswordForget', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<PasswordForget />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const wrapper = shallow(<PasswordForget />)
    const expected = {
      email: '',
      submitSuccessful: false,
      error: false
    }

    expect(wrapper.state()).toEqual(expected)
  })

  it('should update state on submit', () => {
    const wrapper = shallow(<PasswordForget />)
    const mockEvent = {preventDefault: () => {}}
    const expected = {
      email: '',
      submitSuccessful: false,
      error: false
    }
    wrapper.find('form').simulate('submit', mockEvent)

    expect(wrapper.state()).toEqual(expected)
  })
})
