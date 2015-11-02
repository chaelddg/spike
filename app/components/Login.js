"use strict";

import React from 'react';
import DocumentTitle from 'react-document-title';
import { History } from 'react-router'
import { createHistory, useBasename } from 'history'
import auth from '../services/AuthService'

import LoginActions from '../actions/LoginActions';

var Login = React.createClass({
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

    LoginActions.login(email, pass, (loggedIn) => {
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
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    )
  }
})
module.exports = Login;
