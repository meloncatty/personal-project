import React, { Component } from 'react'
import { connect } from 'react-redux'
import { queryResults } from '../Actions'
import { withRouter } from 'react-router-dom'
import './index.css'
import mockData from '../mockdata'

export class SearchResults extends Component {
  constructor() {
    super()
  }

  cleanQueryResults = () => {
    return this.props.queryResultsSuccess.map((result, index) =>
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

  render() {
    return (
      <section className='results-list'>
      {this.props.queryResultsSuccess.length > 1 && this.cleanQueryResults()}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  queryResultsSuccess: state.queryResultsSuccess
})

export default connect(mapStateToProps)(SearchResults)
