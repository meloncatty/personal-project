
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import mockData from '../mockdata'

export class SearchResults extends Component 
{
  constructor() {
    super()
  }
  cleanQueryResults = (results) => {
    return results.map((result, index) => 
      (
        <article key={index}>
          <h1>{result.title}</h1>
          <h3>{result.authors}</h3>
          <h3>{result.datePublished}</h3>
          <p>{result.description}</p>
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
      this.cleanQueryResults(mockData)
    )
  }
}

export default withRouter(SearchResults)