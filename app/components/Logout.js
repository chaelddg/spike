"use strict";

import React from 'react';
import auth from '../services/AuthService';

import LoginActions from '../actions/LoginActions';

var Logout = React.createClass({
  componentDidMount() {
    LoginActions.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

module.exports = Logout;