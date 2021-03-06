"use strict";

import React from 'react';
import DocumentTitle from 'react-document-title';
import { History } from 'react-router'
import { createHistory, useBasename } from 'history'
import auth from '../services/AuthService'

var Sign Up = React.createClass({
  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    var email = this.refs.email.value
    var pass = this.refs.pass.value

    auth.Sign Up(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      var { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname)
      } else {
        this.history.replaceState(null, '/about')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">Sign Up</button>
        {this.state.error && (
          <p>Bad Sign Up information</p>
        )}
      </form>
    )
  }
})
module.exports = Login;
