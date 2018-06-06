import React from 'react'
import {shallow} from 'enzyme'
import {SignOutButton, mapDispatchToProps} from '../'
import {isUserSignedIn} from '../../../Actions'

describe('SignOut', () => {
  it('should match snapshot', async () => {
    const wrapper = shallow(<SignOutButton isUserSignedIn={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  });

  it('should sign out user', () => {
    const userAuthentication = jest.fn()
    const wrapper = shallow(<SignOutButton isUserSignedIn={jest.fn()} userAuthentication={userAuthentication} />)
    wrapper.find('.sign-out').simulate('click')

    expect(wrapper.instance().userAuthentication).toHaveBeenCalled
  });

  describe('mapDispatchToProps', () => {
    it('should return false when user signs out', () => {
      const wrapper = shallow(<SignOutButton isUserSignedIn={jest.fn()} />)
      const mockDispatch = jest.fn()
      const actionToDispatch = isUserSignedIn(false)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.isUserSignedIn(false)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });
  });
});