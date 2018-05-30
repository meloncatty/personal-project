import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { fetchArticles } from '../Actions'
import './index.css'

export class LandingPage extends Component {
  constructor() {
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

  handleSubmit = (e) => {
    e.preventDefault()
    const url = `https://core.ac.uk:443/api-v2/articles/search/${this.state.userInput}?page=1&pageSize=10&metadata=true&fulltext=false&citations=true&similar=false&duplicate=false&urls=true&faithfulMetadata=false&apiKey=${apiKey}`
    this.props.fetchArticles(url)
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
            placeholder='Search through thousands of open source articles'
          />
          <button>Submit</button>
        </form>
        {this.state.redirectToSearch &&
          (<Redirect to={'/searchResults'} />)}
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  resultsLoading: state.resultsLoading,
  resultsErrored: state.resultsErrored,
  resultsSuccess: state.resultsSuccess
})

export const mapDispatchToProps = dispatch => ({
  fetchArticles: (query) => dispatch(fetchArticles(query))
})

export default connect(null, mapDispatchToProps)(LandingPage)
