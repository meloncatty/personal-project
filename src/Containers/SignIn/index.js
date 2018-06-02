import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../../Firebase'
import * as routes from '../../Constants/routes'

export class SignIn extends Component {
  constructor() {
    super()

  }

  render() {
    return(
      <div></div>
    )
  }
}

export default withRouter(SignIn)