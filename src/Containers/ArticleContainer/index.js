import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import loading from '../../assets/loading02.gif'
import './styles.css'

export class ArticleContainer extends Component {
  constructor() {
    super()
  }

  cleanFullArticle = () => {
    const {authors, datePublished, fullText, title, topics, fulltextIdentifier} = this.props.fullArticleSuccess
    return (
        <article className='article-contents'>
          <h2>{title}</h2>
          <h3>{authors}</h3>
          <h3>{datePublished}</h3>
          <div className='toggle-text'>
            <p>{fullText}</p>
          </div>
          <h4>{topics}</h4>
          {fulltextIdentifier && 
          <a href={fulltextIdentifier} target='target_blank'>Human friendly full text</a>}
        </article>
    )
  }

  toggleLoading = () => {
    if(this.props.fullArticleSuccess > 0) {
      console.log('fuck you')
    }
    return this.props.fullArticleLoading
      ? this.loadingStation()
      : this.cleanFullArticle()
  }

  loadingStation = () => {
    return (
      <div className='loading-container'>
        <img src={loading} alt='Loading icon' />
      </div>
    )
  }

  displayErrorText = () => {
    return (
      <div className='error-container'>
        <p>Oops! Something went wrong. Please try again.</p>
      </div>
    )
  }

  render() {
    return (
      <section className='article-container'>
      {this.toggleLoading()}
      {this.props.fullArticleErrored && this.displayErrorText()}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  fullArticleSuccess: state.fullArticleSuccess,
  fullArticleErrored: state.fullArticleErrored,
  fullArticleLoading: state.fullArticleLoading
})

export default withRouter(connect(mapStateToProps)(ArticleContainer))
