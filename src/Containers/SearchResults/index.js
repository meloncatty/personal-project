import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter, Redirect } from 'react-router-dom'
import { fetchFullText, fetchNextPage } from '../../Actions'
import { db } from '../../Firebase/firebase'
import ArticleContainer from '../ArticleContainer'
import './index.css'
import loading from '../../assets/loading02.gif'

export class SearchResults extends Component {
  constructor() {
    super()

    this.state = {
      redirectToArticle: false,
      canUserPost: false,
      pageCounter: 1
    }
  }

  redirectToArticle = (id) => {
    this.props.fetchFullText(id)
    this.setState({
      redirectToArticle: true
    })
  }

  postArticle = (e, article) => {
    e.preventDefault()
    if(this.props.isUserSignedIn) {
      this.setState({
        canUserPost: true
      })
      db.ref()
        .child('users')
        .child(`${this.props.userAuthentication}`)
        .child('articles')
        .child('article')
        .push(article.id)
    }
  }

  cleanQueryResults = () => {
    let results = []
    if (this.props.resultsSuccess.length > 1) {
      results = this.props.resultsSuccess
    }
    if (this.props.nextPageSuccess.length > 1) {
      results = this.props.nextPageSuccess
    }
    return results.map((result, index) =>
      (
        <article key={index}>
          <h1>
            <Link to='/articleContainer' onClick={(e) => {
                e.preventDefault()
                this.redirectToArticle(result.id)
                }}>
              {result.title}
            </Link>
          </h1>
          <h3>Authors: {result.authors}</h3>
          <h3>Date Published: {result.datePublished}</h3>
          <p>{result.description && result.description.slice(0,500) + '...'}</p>
          {
            result.downloadUrl &&
            <a href={result.downloadUrl}>Download </a>
          }
          {
            this.props.userAuthentication &&
            // eslint-disable-next-line
              <a href='#' className='archive-article' onClick={(e) => {
                this.postArticle(e, result)}}>Archive</a>
          }
          {!this.state.canUserPost && <p className=
            'archive-denied'>Please sign in to archive.</p>}
        </article>
      )
    )
  }

  incrementPage = () => {
    const incPageNum = this.state.pageCounter + 1
    this.setState({
      pageCounter: incPageNum
    })
    this.props.fetchNextPage(this.props.captureQuery, incPageNum)
    window.scrollTo(0,0)
  }

  toggleLoading = () => {
    return this.props.resultsAreLoading || this.props.nextPageLoading
      ? this.loadingStation()
      : this.cleanQueryResults()
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
      <div className='results-container'>
      <section className='results-list'>
        {this.toggleLoading()}
        {(this.props.resultsHaveErrored || this.props.nextPageErrored) && this.displayErrorText()}
        {this.state.redirectToArticle &&
          (<Redirect to={'/articleContainer'} />)}
      </section>
        { this.props.resultsTotalHits &&
          <button className='next-page' onClick={this.incrementPage}>Next Page</button>
        }
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  resultsSuccess: state.resultsSuccess,
  resultsTotalHits: state.resultsTotalHits,
  resultsAreLoading: state.resultsAreLoading,
  resultsHaveErrored: state.resultsHaveErrored,
  userAuthentication: state.userAuthentication,
  userSignupSuccess: state.userSignupSuccess,
  isUserSignedIn: state.isUserSignedIn,
  nextPageSuccess: state.nextPageSuccess,
  nextPageLoading: state.nextPageLoading,
  nextPageErrored: state.nextPageErrored,
  captureQuery: state.captureQuery
})

export const mapDispatchToProps = dispatch => ({
  fetchFullText: (id) => dispatch(fetchFullText(id)),
  fetchNextPage: (query, pageNum) => dispatch(fetchNextPage(query, pageNum))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
