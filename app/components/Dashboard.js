"use strict";

import React from 'react';
import auth from '../services/AuthService'

// import LoginStore from '../stores/LoginStore';
import LoginStore from '../stores/LoginStore';

class Dashboard extends React.Component {

  constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.loggedIn(),
        user: LoginStore.user,
        jwt: LoginStore.jwt
      };
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

  render() {

    var token = LoginStore.getToken();

    return (
      <div>
        <h1>Dashboard</h1>
        <h2>{this.state.user}</h2>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }

}

module.exports = Dashboard;