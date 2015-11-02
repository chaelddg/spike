"use strict";

import AppDispatcher from '../dispatchers/AppDispatcher';
import { LOGIN_USER, LOGOUT_USER, SIGNUP_URL } from '../constants/LoginConstants';

export default {

   login: (username, password, cb) => {

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            username: username,
            password: password,
            cb: cb
        });

   },

   logout: () => {
        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
   },

   signupUser: (username, password, cb) => {

        AppDispatcher.dispatch({
            actionType: SIGNUP_URL,
            username: username,
            password: password,
            cb: cb
        });

   }

}