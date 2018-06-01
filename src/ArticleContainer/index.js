import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export class ArticleContainer extends Component {
  constructor() {
    super()
  }



  render() {
    return (
      <section>

      </section>
    )
  }
}

export const mapStateToProps = state => ({
  queryResults: state.queryResults
})

export default withRouter(connect(mapStateToProps)(ArticleContainer))
