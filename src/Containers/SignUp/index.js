import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../../Firebase'
import * as routes from '../../Constants/routes'

export class SignUp extends Component {
  constructor() {
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
      password,
    } = this.state

    const {
      history,
    } = this.props

    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState(() => ({ ...this.state }))
        history.push(routes.HOME)
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

  render() {
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

    return(
      <section>
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSignUpSubmit}>
          <input
            name='username'
            onChange={this.handleSignUpChange}
            type='text'
            placeholder='Full Name'
          />
          <input
            name='email'
            onChange={this.handleSignUpChange}
            type='text'
            placeholder='Email Address'
          />
          <input
            name='password'
            onChange={this.handleSignUpChange}
            type='password'
            placeholder='Password'
          />
          <input
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

export default withRouter(SignUp)