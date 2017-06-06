const AUTH_PATH = '/auth'
const AUTH_PATH_GITHUB = AUTH_PATH + '/github'
const AUTH_PATH_LOGOUT = AUTH_PATH + '/logout'
const SUCCESS_REDIRECT = '/'
const FAILURE_REDIRECT = AUTH_PATH + '/failed'
const LOGOUT_REDIRECT = SUCCESS_REDIRECT

module.exports = {
  AUTH_PATH,
  AUTH_PATH_GITHUB,
  AUTH_PATH_LOGOUT,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT,
  LOGOUT_REDIRECT
}
