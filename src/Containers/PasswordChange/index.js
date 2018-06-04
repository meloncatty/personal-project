import React, { Component } from 'react'
import { auth } from '../../Firebase'
import './styles.css'

export class PasswordChange extends Component {
  constructor() {
    super()

    this.state = {
      password: '',
      passwordAuth: '',
      submitSuccessful: false,
      error: false
    }
  }

  onSubmit = (e) => {
    const {password} = this.state
    auth.doPasswordUpdate(password)
      .then(() => {
        this.setState({
          password: '',
          passwordAuth: '',
          submitSuccessful: true,
          error: false
        })
      })
      .catch(error => {
        this.setState({
          error: error
        })
      })
      e.preventDefault()
  }

  emailSent = () => {
    return <p>Please check your inbox for further instructions</p>
  }

  render() {
    const {password, passwordAuth, error, submitSuccessful} = this.state
    const isInvalid =
      password !== passwordAuth ||
      password === ''
    return (
      <section className='form-container'>
      <form
        onSubmit={this.onSubmit}
        className='change-password'
      >
        <label>Change Password</label>
        <input
          className='password'
          value={password}
          onChange={e => this.setState({
            password: e.target.value
          })}
          type='password'
          placeholder='New Password'
        />
        <input
          className='password-confirm'
          value={passwordAuth}
          onChange={e => this.setState({
            passwordAuth: e.target.value
          })}
          type='password'
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>
          Change Password
        </button>

        { !error && <p>{ error.message }</p> }

        { submitSuccessful && this.emailSent() }
      </form>
      </section>
    )
  }
}

export default PasswordChange
