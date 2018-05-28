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

  cleanQueryResults = (results) => {
    const cleanDescLength = (desc) => {
      return desc.length > 400 ? desc.slice(0, 400) + '...' : desc
    }
    return results.map((result, index) =>
      (
        <article key={index}>
          <h1>{result.title}</h1>
          <h3>{result.authors}</h3>
          <h3>{result.datePublished}</h3>
          <p>{cleanDescLength(result.fullText)}</p>
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
      {this.cleanQueryResults(this.props.queryResults)}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  queryResults: state.queryResults
})

// export const mapDispatchToProps = dispatch => ({
//   queryResults: (results) => dispatch(queryResults(results))
// })

export default connect(mapStateToProps)(SearchResults)
