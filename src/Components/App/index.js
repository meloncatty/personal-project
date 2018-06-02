import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import ArticleContainer from '../../Containers/ArticleContainer'
import LandingPage from '../../Containers/LandingPage'
import SearchResults from '../../Containers/SearchResults'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <ul>
            <li>Sign up</li>
            <li>Sign out</li>
          </ul>
        </header>
        <LandingPage />
        <Route exact path='/searchResults' component={SearchResults} />
        <Route exact path='/articleContainer' component={ArticleContainer} />
        <footer>
          <img src="https://core.ac.uk/images/powered-by-core-orange.png" alt='Powered by CORE' />
        </footer>
      </div>
    )
  }
}

export default withRouter(App)
