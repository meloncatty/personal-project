import React from 'react'
import {shallow} from 'enzyme'
import {SignOutButton, mapDispatchToProps} from '../'
import {isUserSignedIn} from '../../../Actions'

describe('SignOut', () => {
  let signOutButton

  beforeEach(() => {
    signOutButton = shallow(<SignOutButton isUserSignedIn={jest.fn()} userAuthentication={jest.fn()}/>)
  })
  it('should match snapshot', async () => {
    expect(signOutButton).toMatchSnapshot()
  })

  it('should unauthenticate user on sign out', () => {
    signOutButton.find('.sign-out').simulate('click')

    expect(signOutButton.instance().props.userAuthentication).toHaveBeenCalledWith(false)
  })

  it('should update prop isUserSignedIn on sign out', () => {
    signOutButton.find('.sign-out').simulate('click')

    expect(signOutButton.instance().props.isUserSignedIn).toHaveBeenCalledWith(false)
  })

  describe('mapDispatchToProps', () => {
    it('should return false when user signs out', () => {
      const mockDispatch = jest.fn()
      const actionToDispatch = isUserSignedIn(false)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.isUserSignedIn(false)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})
