import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link, withRouter, Redirect } from 'react-router-dom'
import { fetchFullText } from '../../Actions'
import { db } from '../../Firebase/firebase'
import ArticleContainer from '../ArticleContainer'
import './index.css'
import loading from '../../assets/loading02.gif'

export class SearchResults extends Component {
  constructor() {
    super()

    this.state = {
      redirectToArticle: false
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
    if(this.props.userAuthentication.length) {
      const itemsRef = db.ref('articles')
      const articleInfo = {
        article,
        user: this.props.userAuthentication[0].user.email
      }
      itemsRef.push(articleInfo)
    }
  }

  cleanQueryResults = () => {
    return this.props.resultsSuccess.map((result, index) =>
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
              <a href='#' onClick={(e) => {
                this.postArticle(e, result)}}>Archive</a>
          }
        </article>
      )
    )
  }

  toggleLoading = () => {
    return this.props.resultsAreLoading
      ? this.loadingStation()
      : this.props.resultsSuccess.length > 1 && this.cleanQueryResults()
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
      <section className='results-list'>
        {this.toggleLoading()}
        {this.props.resultsHaveErrored && this.displayErrorText()}
        {this.state.redirectToArticle &&
          (<Redirect to={'/articleContainer'} />)}
        <Route exact path='/articleContainer' component={ArticleContainer} />
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  resultsSuccess: state.resultsSuccess,
  resultsAreLoading: state.resultsAreLoading,
  resultsHaveErrored: state.resultsHaveErrored,
  userAuthentication: state.userAuthentication
})

export const mapDispatchToProps = dispatch => ({
  fetchFullText: (id) => dispatch(fetchFullText(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults))
