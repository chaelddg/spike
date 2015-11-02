"use strict";

import './assets/styles.js';

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, History } from 'react-router'
import { createHistory, useBasename } from 'history'

import App from './components/App'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Logout from './components/Logout'
import Login from './components/Login'

import LoginStore from './stores/LoginStore';

const history = useBasename(createHistory)({
  basename: '/codeapp'
})

function requireAuth(nextState, replaceState) {
  if (!LoginStore.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('app'))