import React from 'react'
import { PasswordChange } from '../'
import { shallow } from 'enzyme'

describe("PasswordChange", () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<PasswordChange />)
    expect(wrapper).toMatchSnapshot()
  });

  it("should have default state", () => {
    const wrapper = shallow(<PasswordChange />)
    const expected = {
      password: '',
      passwordAuth: '',
      submitSuccessful: false,
      error: false
    }

    expect(wrapper.state()).toEqual(expected)
  });

  it("should update state on submit", () => {
    const wrapper = shallow(<PasswordChange />)
    const mockEvent = {preventDefault: () => {}}
    const expected = {
      password: '',
      passwordAuth: '',
      submitSuccessful: false,
      error: false
    }
    wrapper.find('button').simulate('click', mockEvent)

    expect(wrapper.state()).toEqual(expected)
  });
});
