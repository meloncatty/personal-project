import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { auth } from '../../Firebase'
import { connect } from 'react-redux'
import { userAuthentication, isUserSignedIn } from '../../Actions'
import * as routes from '../../Constants/routes'
import './styles.css'

export class SignIn extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  handleSignInSubmit = (e) => {
    e.preventDefault()
    const {
      email,
      password,
    } = this.state

    const {
      history,
    } = this.props

    auth.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {

        this.setState(() => ({ ...this.state }))
        this.props.userAuthentication(authUser.user.uid)
        this.props.isUserSignedIn(true)
        history.push(routes.HOME)
      })
      .catch(error => {
        this.setState({error: error})
      })
  }

  handleSignInChange = (e) => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state

    const isInvalid =
      password === '' ||
      email === ''

    return(
      <section className='form-container'>
        <form
        className='sign-in-form'
        onSubmit={this.handleSignInSubmit}>
          <label>Sign In</label>
          <input
            className='email'
            name='email'
            onChange={this.handleSignInChange}
            type='text'
            placeholder='Email Address'
          />
          <input
            className='password'
            name='password'
            onChange={this.handleSignInChange}
            type='password'
            placeholder='Password'
          />
          <button disabled={isInvalid} type='submit'>Sign In</button>

          { error && <p>{error.message}</p> }
        </form>
        <Link to='/passwordForget'>Forgot Password?</Link>
      </section>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  userAuthentication: (userData) => dispatch(userAuthentication(userData)),
  isUserSignedIn: (bool) => dispatch(isUserSignedIn(bool))
})

export default withRouter(connect(null, mapDispatchToProps)(SignIn))
