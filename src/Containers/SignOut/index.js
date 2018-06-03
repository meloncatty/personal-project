import React, { Component } from 'react'
import { auth } from '../../Firebase'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userAuthentication } from '../../Actions'

export class SignOutButton extends Component {
  render() {
    return (
      <li>
        <Link to='/'
        onClick={() => {

          this.props.userAuthentication(false)
          auth.doSignOut()
        }}
      >
        Sign Out
        </Link>
      </li>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  userAuthentication: (bool) => dispatch(userAuthentication(bool))
})

export default connect(null, mapDispatchToProps)(SignOutButton)