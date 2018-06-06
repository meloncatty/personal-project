import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import loading from '../../assets/loading02.gif'
import './styles.css'

export class ArticleContainer extends Component {
  constructor() {
    super()

    this.state = {
      toggleText: false
    }
  }

  toggleText = () => {
    this.state.toggleText
      ? this.setState({
        toggleText: false
      })
      : this.setState({
        toggleText: true
      })
  }

  cleanFullArticle = () => {
    const {authors, datePublished, fullText, title, topics, fulltextIdentifier} = this.props.fullArticleSuccess
    const expandText = this.state.toggleText ? 'toggle-text open' : 'toggle-text closed'
    return (
        <article className='article-contents'>
          <h2>{title}</h2>
          <h3>Authors: {authors}</h3>
          <h3>Date published: {datePublished}</h3>
          <label className="lbl-toggle" onClick={this.toggleText}>Click to expand</label>
          <div className={expandText}>
            <p>{fullText}</p>
          </div>
          <h4>Topics: {topics}</h4>
          {fulltextIdentifier &&
          <a href={fulltextIdentifier} className='download-article' target='target_blank'>View PDF</a>}
        </article>
    )
  }

  toggleLoading = () => {
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
