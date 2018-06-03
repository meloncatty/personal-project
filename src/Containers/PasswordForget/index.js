import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../Firebase'
import './styles.css'

export class PasswordForget extends Component {
  constructor() {
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
    const {email, error, submitSuccessful} = this.state
    const isInvalid = email === ''
    const {history} = this.props
    return (
      <section className='form-container'>
      <form 
        onSubmit={this.onSubmit}
        className='reset-password'  
      >
        <label>Reset Your Password</label>
        <input
          value={this.state.email}
          onChange={e => this.setState({
            email: e.target.value
          })}
          type='text'
          placeholder='Email Address'
        />
        <button disabled={isInvalid} type='submit'>
          Reset Password
        </button>

        { !error && <p>{ error.message }</p> }

        { submitSuccessful && this.emailSent() }
      </form>
      </section>
    )
  }
}

export default PasswordForget