import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { fetchArticles } from '../../Actions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.css'

export class LandingPage extends Component {
  constructor () {
    super()

    this.state = {
      searchInput: '',
      redirectToSearch: false
    }
  }

  handleChange = e => {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.fetchArticles(this.state.searchInput)
    this.setState({
      redirectToSearch: true,
      searchInput: ''
    })
  }

  render () {
    return (
      <main>
        <form
          onSubmit={this.handleSubmit}>
          <input
            className='search-input'
            onChange={this.handleChange}
            name='query'
            type='text'
            value={this.state.searchInput}
            placeholder='Search through thousands of open source articles'
          />
          <button className='submit-search'>Submit</button>
        </form>
        {this.state.redirectToSearch &&
          (<Redirect to={'/searchResults'} />)}
      </main>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  fetchArticles: (query) => dispatch(fetchArticles(query))
})

LandingPage.propTypes = {
  fetchArticles: PropTypes.func.isRequired
}

export default withRouter(connect(null, mapDispatchToProps)(LandingPage))
