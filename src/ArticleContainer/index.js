import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ArticleContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div></div>
    )
  }
}

export const mapStateToProps = state => ({
  queryResults: state.queryResults
})

export default connect(mapStateToProps)(ArticleContainer)