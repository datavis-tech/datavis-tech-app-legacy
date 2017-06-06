const passport = require('passport')
const passportGitHub = require('passport-github')
const config = require('../config.js')

const {
  AUTH_PATH,
  AUTH_PATH_GITHUB,
  AUTH_PATH_LOGOUT,
  SUCCESS_REDIRECT,
  FAILURE_REDIRECT,
  LOGOUT_REDIRECT
} = require('./authConstants')

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
    (accessToken, refreshToken, profile, cb) => cb(null, profile)
  ))

  return passport.initialize()
}

module.exports = (app) => {
  app.use(initPassport())
  app.use(passport.session())
  app.get(AUTH_PATH + '/failed', (req, res) => res.send('Authentication failed'))
  app.get(AUTH_PATH_GITHUB, passport.authenticate('github'))
  app.get(AUTH_PATH_GITHUB + '/callback',
    passport.authenticate('github', { failureRedirect: FAILURE_REDIRECT }),
    (req, res) => res.redirect(SUCCESS_REDIRECT)
  )
  app.get(AUTH_PATH_LOGOUT, (req, res) => {
    req.logout()
    res.redirect(LOGOUT_REDIRECT)
  })
}
