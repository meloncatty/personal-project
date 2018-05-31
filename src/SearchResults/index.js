import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import loading from '../assets/loading02.gif'

export class SearchResults extends Component {
  constructor() {
    super()
  }

  cleanQueryResults = () => {
    return this.props.resultsSuccess.map((result, index) =>
      (
        <article key={index}>
          <h1>{result.title}</h1>
          <h3>{result.authors}</h3>
          <h3>{result.datePublished}</h3>
          <p>{result.description && result.description.slice(0,500) + '...'}</p>
          {
            result.downloadUrl &&
            <a href={result.downloadUrl}>Download</a>
          }
        </article>
      )
    )
  }

  toggleLoading = () => {
    return !this.props.resultsSuccess || this.props.resultsAreLoading
      ? this.loadingStation()
      : this.props.resultsSuccess.length > 1 && this.cleanQueryResults()
  }

  loadingStation = () => {
    return (
      <div className='loading-container'>
        <img src={loading} alt='Loading icon' />
      </div>
    )
  }

  render() {
    return (
      <section className='results-list'>
        {this.toggleLoading()}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  resultsSuccess: state.resultsSuccess,
  resultsAreLoading: state.resultsAreLoading
})

export default connect(mapStateToProps)(SearchResults)
