import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles.css'

export class ArticleContainer extends Component {
  constructor() {
    super()
  }

  render() {
    const {authors, datePublished, fullText, title, topics, fulltextIdentifier} = this.props.fullArticleSuccess
    return (
      this.props.fullArticleSuccess.length > 0 &&
      <section className='article-container'>
        <article className='article-contents'>
          <h2>{title}</h2>
          <h3>{authors}</h3>
          <h3>{datePublished}</h3>
          <div className='toggle-text'>
            <p>{fullText}</p>
          </div>
          <h4>{topics}</h4>
          {fulltextIdentifier && 
          <a href={fulltextIdentifier}>Human friendly full text</a>}
        </article>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  fullArticleSuccess: state.fullArticleSuccess
})

export default withRouter(connect(mapStateToProps)(ArticleContainer))
