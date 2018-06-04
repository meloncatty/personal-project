import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ArticleContainer from '../../Containers/ArticleContainer'
import LandingPage from '../../Containers/LandingPage'
import SearchResults from '../../Containers/SearchResults'
import SignUp from '../../Containers/SignUp'
import SignIn from '../../Containers/SignIn'
import SignOutButton from '../../Containers/SignOut'
import PasswordForget from '../../Containers/PasswordForget'
import PasswordChange from '../../Containers/PasswordChange'
import logo from '../../assets/logo.png'
import * as routes from '../../Constants/routes'
import './App.css'
import UserDashboard from '../../Containers/UserDashboard'

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      article: 'test'
    }
  }

  render() {
    return (
      <div>
        <header className='header'>
          <Link to='/'><img src={logo} alt='Search Open Source' className='logo'/></Link>
            {
              !this.props.isUserSignedIn &&
              <ul>
              <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
              <li><Link to={routes.SIGN_IN}>Sign in</Link></li>
              </ul>
            }
            {
              this.props.isUserSignedIn && 
              <ul>
              <li>Welcome back, User!</li>
              <li><Link to='/passwordChange'>Change Password</Link></li>
              <SignOutButton />
              <li><Link to='/userDashboard'>Dashboard</Link></li>
              </ul>
            }
        </header>
        <LandingPage />
        <Route exact path='/searchResults' component={SearchResults} />
        
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path='/articleContainer' component={ArticleContainer} />
        <Route exact path='/passwordForget' component={PasswordForget} />
        <Route exact path='/userDashboard' component={UserDashboard} />
        <Route exact path='/passwordChange' component={PasswordChange} />
        <footer>
          <img src="https://core.ac.uk/images/powered-by-core-orange.png" alt='Powered by CORE' />
        </footer>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userAuthentication: state.userAuthentication,
  isUserSignedIn: state.isUserSignedIn
})

export default withRouter(connect(mapStateToProps)(App))
