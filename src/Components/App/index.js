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
import logo from '../../assets/logo.png'
import * as routes from '../../Constants/routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <Link to='/'><img src={logo} alt='Search Open Source' className='logo'/></Link>
            {
              !this.props.userAuthentication &&
              <ul>
              <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
              <li><Link to={routes.SIGN_IN}>Sign in</Link></li>
              </ul>
            }
            {
              this.props.userAuthentication && 
              <ul>
              <li>Welcome back, User!</li>
              <li><SignOutButton /></li>
              </ul>
            }
        </header>
        <LandingPage />
        <Route exact path='/searchResults' component={SearchResults} />
        
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path='/articleContainer' component={ArticleContainer} />
        <Route exact path='/passwordForget' component={PasswordForget} />
        <footer>
          <img src="https://core.ac.uk/images/powered-by-core-orange.png" alt='Powered by CORE' />
        </footer>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userAuthentication: state.userAuthentication
})

export default withRouter(connect(mapStateToProps)(App))
