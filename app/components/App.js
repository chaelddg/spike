"use strict";

import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
// import auth from '../services/AuthService'

// import AuthService from '../stores/AuthService';
import LoginStore from '../stores/LoginStore';

var App = React.createClass({
  getInitialState() {
    return {
      loggedIn: LoginStore.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    LoginStore.onChange = this.updateAuth
    LoginStore.login()
  },

  render() {
    return (
      <div className="container">
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Log out</Link>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          {this.state.loggedIn ? <li><Link to="/dashboard">Dashboard</Link> (authenticated)</li> : "" }
        </ul>
        {this.props.children}
      </div>
    )
  }
})

module.exports = App;