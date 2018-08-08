import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { auth, db } from '../../Firebase'
import { userSignupSuccess } from '../../Actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as routes from '../../Constants/routes'
import './styles.css'

export class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      email: '',
      passwordAuth: '',
      password: '',
      error: null
    }
  }

  handleSignUpSubmit = (e) => {
    e.preventDefault()
    const {
      username,
      email,
      password
    } = this.state

    const {
      history
    } = this.props

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...this.state }))
            this.props.userSignupSuccess(true)
            history.push(routes.HOME)
          })
          .catch(error => {
            this.setState({error: error})
          })
      })
      .catch(error => {
        this.setState({error: error})
      })
  }

  handleSignUpChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render () {
    const {
      username,
      email,
      passwordAuth,
      password,
      error
    } = this.state

    const isInvalid =
      password !== passwordAuth ||
      password === '' ||
      email === '' ||
      username === ''

    return (
      <section className='form-container'>

        <form
          className='sign-up-form' onSubmit={this.handleSignUpSubmit}>
          <label>Create An Account</label>
          <input
            className='username'
            name='username'
            onChange={this.handleSignUpChange}
            type='text'
            placeholder='Full Name'
          />
          <input
            name='email'
            className='new-email'
            onChange={this.handleSignUpChange}
            type='text'
            placeholder='Email Address'
          />
          <input
            className='password-sign-up'
            name='password'
            onChange={this.handleSignUpChange}
            type='password'
            placeholder='Password'
          />
          <input
            className='password-auth'
            name='passwordAuth'
            onChange={this.handleSignUpChange}
            type='password'
            placeholder='Confirm Password'
          />
          <button disabled={isInvalid} type='submit'>Sign Up</button>

          { error && <p>{error.message}</p> }
        </form>

      </section>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  userSignupSuccess: (bool) => dispatch(userSignupSuccess(bool))
})

SignUp.propTypes = {
  userSignupSuccess: PropTypes.func.isRequired
}

export default withRouter(connect(null, mapDispatchToProps)(SignUp))
