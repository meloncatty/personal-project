import React, { Component } from 'react'
import { auth } from '../../Firebase'
import './styles.css'

export class PasswordForget extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      submitSuccessful: false,
      error: false
    }
  }

  onSubmit = (e) => {
    const {email} = this.state
    auth.doPasswordReset(email)
      .then(() => {
        this.setState({
          email: '',
          error: false,
          submitSuccessful: true
        })
      })
      .catch(e => {
        this.setState({
          error: e
        })
      })
    e.preventDefault()
  }

  emailSent = () => {
    return <p>Please check your inbox for further instructions</p>
  }

  render () {
    const {email, error, submitSuccessful} = this.state
    const isInvalid = email === ''

    return (
      <section className='form-container'>
        <form
          onSubmit={this.onSubmit}
          className='reset-password'
        >
          <label>Reset Your Password</label>
          <input
            value={email}
            onChange={e => this.setState({
              email: e.target.value
            })}
            type='text'
            placeholder='Email Address'
          />
          <button disabled={isInvalid} type='submit'>
          Reset Password
          </button>

          { error && <p>{ error.message }</p> }

          { submitSuccessful && this.emailSent() }
        </form>
      </section>
    )
  }
}

export default PasswordForget
