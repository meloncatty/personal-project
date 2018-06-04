import React, { Component } from 'react'
import { db } from '../../Firebase/firebase'
import { connect } from 'react-redux'
import { captureUserArticles } from '../../Actions'

export class UserDashboard extends Component {

  fetchArticles() {
    const {isUserSignedIn} = this.props
    if(isUserSignedIn) {
      const {email} = this.props.userAuthentication[0].user
      const ref = db.ref('articles')
      ref.once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val()
            if(data.user === email)
            this.props.captureUserArticles(data)
          })
        }) 
    }
  }

  render() {
    return (
      <div>
        {this.fetchArticles()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isUserSignedIn: state.isUserSignedIn, 
  userAuthentication: state.userAuthentication
})

const mapDispatchToProps = dispatch => ({
  captureUserArticles: (articles) => dispatch(captureUserArticles(articles))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard)