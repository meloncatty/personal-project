import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import apiKey from '../apiKey.js'
import { queryResults } from '../Actions'
import './index.css'

export class LandingPage extends Component {
  constructor() {
    super()

    this.state = {
      searchInput: '',
      redirectToSearch: false
    }
  }

  fetchQuery = async () => {
    const {searchInput} = this.state
    const url = `https://core.ac.uk:443/api-v2/articles/search/${searchInput}?page=1&pageSize=10&metadata=false&fulltext=true&citations=true&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=${apiKey}`
    const response = await fetch(url)
    const results = await response.json()
    this.props.queryResults(results.data)
  }

  handleChange = e => {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.fetchQuery()
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

export const mapStateToProps = state => ({queryResults: state.queryResults})

export const mapDispatchToProps = dispatch => ({
  queryResults: (results) => dispatch(queryResults(results))
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
