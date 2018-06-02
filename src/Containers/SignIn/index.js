import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../../Firebase'
import * as routes from '../../Constants/routes'

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
      <section>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSignInSubmit}>
          <input
            name='email'
            onChange={this.handleSignInChange}
            type='text'
            placeholder='Email Address'
          />
          <input
            name='password'
            onChange={this.handleSignInChange}
            type='password'
            placeholder='Password'
          />
          <button disabled={isInvalid} type='submit'>Sign In</button>

          { error && <p>{error.message}</p> }
        </form>
      </section>
    )
  }
}

export default withRouter(SignIn)