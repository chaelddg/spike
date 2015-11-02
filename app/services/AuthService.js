import when from 'when';
import request from 'reqwest';
import jwt_decode from 'jwt-decode';
import { LOGIN_USER, LOGOUT_USER, SIGNUP_URL, LOGIN_URL } from '../constants/LoginConstants';

module.exports = {
  pretendRequest(username, password, cb) {
    if (username, password) {
      return when(request({
          url: LOGIN_URL,
          method: 'POST',
          crossOrigin: true,
          type: 'json',
          data: {
            username, password
          }
        })).then(
        function resolve(response) {
          if (response) {
            cb({
              authenticated: true,
              token: response.id_token
            })
          }
        },

        function reject(err) {
            cb({ authenticated: false })
        }
      )
    }

  }
}