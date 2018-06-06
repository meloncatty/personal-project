import React from 'react'
import { shallow } from 'enzyme'
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
    const wrapper = shallow(<App userSignupSuccess={true} />)

    expect(wrapper.find('.account-success').length).toEqual(1)
  })
})
