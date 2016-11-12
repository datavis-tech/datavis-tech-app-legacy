import passport from 'passport'
import passportGitHub from 'passport-github'

import {
  SESSION_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL
} from './config'

const AUTH_PATH = '/api/auth'
const FAILURE_REDIRECT = AUTH_PATH + '/failed'
const SUCCESS_REDIRECT = '/'
const LOGOUT_REDIRECT = SUCCESS_REDIRECT

const routes = (app) => {
  app.get(AUTH_PATH + '/failed', (req, res) => {
    res.send('Authentication failed')
  })

  app.get(AUTH_PATH + '/user', (req, res) => {
    if(req.user){
      res.send(JSON.stringify(req.user))
    } else {
      res.send('null')
    }
  })

  app.get(AUTH_PATH + '/github', passport.authenticate('github'))

  app.get(AUTH_PATH + '/github/callback', 
    passport.authenticate('github', {
      failureRedirect: FAILURE_REDIRECT
    }),
    (req, res) => res.redirect(SUCCESS_REDIRECT)
  )

  app.get(AUTH_PATH + '/logout', (req, res) => {
    req.logout()
    res.redirect(LOGOUT_REDIRECT)
  })
}

const initPassport = () => {

  const GitHubStrategy = passportGitHub.Strategy

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, cb) => {
      setTimeout(() => {
        var user = { id: profile.id }
        cb(null, user)
      }, 500)
      //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //  return cb(err, user)
      //})
    }
  ))
  return passport.initialize()
}

export default (app) => {
  app.use(initPassport())
  app.use(passport.session())
  routes(app)
  return passport
}
