import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import ArticleContainer from '../../Containers/ArticleContainer'
import LandingPage from '../../Containers/LandingPage'
import SearchResults from '../../Containers/SearchResults'
import SignUp from '../../Containers/SignUp'
import SignIn from '../../Containers/SignIn'
import logo from '../../assets/logo.png'
import * as routes from '../../Constants/routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <img src={logo} alt='Search Open Source' className='logo'/>
          <ul>
            <li><Link to={routes.SIGN_UP}>Sign up</Link></li>
            <li><Link to={routes.SIGN_IN}>Sign in</Link></li>
          </ul>
        </header>
        <LandingPage />
        <Route exact path='/searchResults' component={SearchResults} />
        <Route exact path='/signIn' component={SignIn} />
        <Route exact path='/signUp' component={SignUp} />
        <Route exact path='/articleContainer' component={ArticleContainer} />
        
        <footer>
          <img src="https://core.ac.uk/images/powered-by-core-orange.png" alt='Powered by CORE' />
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
