import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { LandingPage } from '../LandingPage'
import { SearchResults } from '../SearchResults'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <LandingPage />
        <Route exact path='/searchResults' component={SearchResults} />
      </div>
    )
  }
}

export default withRouter(App)