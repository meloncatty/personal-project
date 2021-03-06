import React, { Component } from 'react'
import { auth } from '../../Firebase'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { isUserSignedIn, userAuthentication } from '../../Actions'
import PropTypes from 'prop-types'

export class SignOutButton extends Component {
  render () {
    return (
      <li>
        <Link to='/'
          className='sign-out'
          onClick={() => {
            this.props.userAuthentication(false)
            this.props.isUserSignedIn(false)
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
  isUserSignedIn: (bool) => dispatch(isUserSignedIn(bool)),
  userAuthentication: bool => dispatch(userAuthentication(bool))
})

SignOutButton.propTypes = {
  isUserSignedIn: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SignOutButton)
