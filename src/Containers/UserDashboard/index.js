import React, { Component } from 'react'
import { db } from '../../Firebase/firebase'
import { connect } from 'react-redux'
import { captureUserArticles, fetchUserArticles } from '../../Actions'
import { withRouter } from 'react-router-dom'

export class UserDashboard extends Component {

  constructor() {
    super()

    this.state = {
      storeArticles: []
    }
  }

  fetchArticlesFromFirebase = () => {
    const {isUserSignedIn} = this.props
    if(isUserSignedIn) {
      const ref = db.ref('users').child(`${this.props.userAuthentication[0]}`).child('articles')
      ref.once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val()
            this.setState({
              storeArticles: [data]
            })
          })
        })
    }
  }

  componentDidMount() {
    this.fetchArticlesFromFirebase()
    this.props.fetchUserArticles(this.state.storeArticles)
  }

  fetchArticlesFromApi = () => {
    
    // this.state.storeArticles.forEach(articleId => this.props.fetchUserArticles(articleId))
  }

  render() {
    return (
      <section>
        {}
      </section>
    )
  }
}

const mapStateToProps = state => ({
  isUserSignedIn: state.isUserSignedIn,
  userAuthentication: state.userAuthentication,
  fetchUserArticlesSuccess: state.fetchUserArticlesSuccess,
  captureUserArticles: state.captureUserArticles
})

const mapDispatchToProps = dispatch => ({
  captureUserArticles: (articles) => dispatch(captureUserArticles(articles)),
  fetchUserArticles: (userArticles) => dispatch(fetchUserArticles(userArticles))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDashboard))
