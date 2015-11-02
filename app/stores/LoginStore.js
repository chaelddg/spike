"use strict";

import when from 'when';
import request from 'reqwest';

import { LOGIN_USER, LOGOUT_USER, SIGNUP_URL, LOGIN_URL } from '../constants/LoginConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

import AuthService from '../services/AuthService'

class LoginStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._user = null;
        this._jwt = null;
    }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this.login(action.username, action.password, action.cb);
        this.emitChange();
        break;
      case LOGOUT_USER:
        this.logout();
        this.emitChange();
        break;
      default:
        break;
    };
  }

   login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.jwt) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    AuthService.pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.jwt = res.token
        if (cb) cb(true)
        this._jwt = res.token;
        let obj = jwt_decode(this._jwt);
        this._user = obj.username;
        console.log(this._user);
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  }

    getToken() {
      return localStorage.jwt
    }

    get user() {
      return this._user;
    }

    logout(cb) {
      localStorage.removeItem('jwt');
      this._user = null;
      if (cb) cb()
      this.onChange(false)
    }

    loggedIn() {
      return !!localStorage.jwt
    }

     onChange() {}
}

module.exports = new LoginStore();