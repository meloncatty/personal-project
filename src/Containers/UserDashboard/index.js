import React, { Component } from 'react'
import { db } from '../../Firebase/firebase'
import { connect } from 'react-redux'
import { fetchUserArticles } from '../../Actions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import './styles.css'

export class UserDashboard extends Component {
  constructor () {
    super()

    this.state = {
      storeArticles: []
    }
  }

  fetchArticlesFromFirebase = () => {
    const {isUserSignedIn} = this.props
    if (isUserSignedIn) {
      const ref = db.ref('users').child(`${this.props.userAuthentication[0]}`).child('articles').child('article')
      ref.once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val()
            this.setState({
              storeArticles: [data]
            })
            this.props.fetchUserArticles(this.state.storeArticles)
          })
        })
    }
  }

  componentDidMount () {
    this.fetchArticlesFromFirebase()
  }

  render () {
    return (
      <section className='user-dashboard'>
        {this.props.fetchUserArticlesSuccess && this.props.fetchUserArticlesSuccess.map((article, index) => {
          return (
            <article key={index}>
              <h1>{article.title}</h1>
              <h3>{article.authors}</h3>
              <p>{article.description}</p>
            </article>
          )
        })}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  isUserSignedIn: state.isUserSignedIn,
  userAuthentication: state.userAuthentication,
  fetchUserArticlesSuccess: state.fetchUserArticlesSuccess
})

export const mapDispatchToProps = dispatch => ({
  fetchUserArticles: (userArticles) => dispatch(fetchUserArticles(userArticles))
})

UserDashboard.propTypes = {
  isUserSignedIn: PropTypes.bool,
  userAuthentication: PropTypes.array,
  fetchUserArticlesSuccess: PropTypes.array,
  fetchUserArticles: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDashboard))
