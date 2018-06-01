import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export class ArticleContainer extends Component {
  constructor() {
    super()
  }

  render() {
    const {authors, datePublished, fullText, title, topics} = this.props.fullArticleSuccess
    return (
      <section className='article-container'>
        <article className='article-contents'>
          <h2>{title}</h2>
          <h3>{authors}</h3>
          <h3>{datePublished}</h3>
          <p>{fullText}</p>
          <h4>{topics}</h4>
        </article>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  fullArticleSuccess: state.fullArticleSuccess
})

export default withRouter(connect(mapStateToProps)(ArticleContainer))
