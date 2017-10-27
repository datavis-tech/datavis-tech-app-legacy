const passport = require('passport')
const passportGitHub = require('passport-github')
const config = require('../config.js')
const findOrCreateUser = require('./findOrCreateUser')

const {
  AUTH_PATH,
  AUTH_PATH_GITHUB,
  AUTH_PATH_LOGOUT,
  AUTH_FAILURE_REDIRECT,
  AUTH_LOGOUT_REDIRECT
} = require('../constants')

const initPassport = () => {
  const GitHubStrategy = passportGitHub.Strategy

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(new GitHubStrategy(
    {
      clientID: config.gitHubClientId,
      clientSecret: config.gitHubClientSecret,
      callbackURL: config.gitHubCallbackURL
    },
    (accessToken, refreshToken, profile, callback) => {
      findOrCreateUser(profile, callback)
    }
  ))

  return passport.initialize()
}

module.exports = (expressApp) => {
  expressApp.use(initPassport())

  expressApp.use(passport.session())

  expressApp.get(AUTH_PATH + '/failed', (req, res) => {
    res.send('Authentication failed')
  })

  expressApp.get(AUTH_PATH_GITHUB, passport.authenticate('github'))

  expressApp.get(AUTH_PATH_GITHUB + '/callback',
    passport.authenticate('github', {
      failureRedirect: AUTH_FAILURE_REDIRECT
    }),

    // Redirect to user profile after successful login.
    (req, res) => res.redirect('/' + req.user.username)
  )

  expressApp.get(AUTH_PATH_LOGOUT, (req, res) => {
    req.logout()
    res.redirect(AUTH_LOGOUT_REDIRECT)
  })
}
