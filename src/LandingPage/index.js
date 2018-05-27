import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LandingPage extends Component {
  constructor() {
    super()

    this.state = {
      searchInput: ''
    }
  }

  handleChange=(e)=> {
    this.setState({
      searchInput: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
  }

  render() {
    return(
      <main>
        <form
          onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name='query'
            type='text'
            value={this.state.query}
            placeholder='Search for journals, articles, authors, etc'
          />
          <button>Submit</button>
        </form>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  getUserQuery: state.getUserQuery
})

export default connect(null, mapStateToProps)(LandingPage)