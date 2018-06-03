import React, { Component } from 'react'
import { auth } from '../../Firebase'
import { connect } from 'react-redux'
import { userAuthentication } from '../../Actions'

export class SignOutButton extends Component {
  render() {
    return (
      <button
        type='button'
        onClick={() => {

          this.props.userAuthentication(false)
          auth.doSignOut()
        }}
      >
        Sign Out
      </button>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  userAuthentication: (bool) => dispatch(userAuthentication(bool))
})

export default connect(null, mapDispatchToProps)(SignOutButton)