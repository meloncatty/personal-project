import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

export class LandingPage extends Component {
  constructor() {
    super()

    this.state = {
      searchInput: '',
      redirectToSearch: false
    }
  }

  handleChange=(e)=> {
    this.setState({
      searchInput: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      redirectToSearch: true
    })
  }

  render() {
    return(
      <main>
        <form
          onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name='query'
            type='text'
            value={this.state.query}
            placeholder='Search for journals, articles, authors, etc'
          />
          <button>Submit</button>
        </form>
        {this.state.redirectToSearch && 
          (<Redirect to={'/searchResults'} />)}
      </main>
    )
  }
}

const mapStateToProps = state => ({
  getUserQuery: state.getUserQuery
})

export default withRouter(connect(null, mapStateToProps)(LandingPage))