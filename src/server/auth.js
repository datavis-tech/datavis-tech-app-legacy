import session from 'express-session'
import { SESSION_SECRET } from './config'

import passport from 'passport';
import passportGitHub from 'passport-github';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './config';

const routes = (app) => {
  app.get('/auth/failed', (req, res) => {
    res.send('Authentication failed')
  })

  app.get('/auth/check', (req, res) => {
    if(req.user){
      res.send('Logged in')
    } else {
      res.send('Not logged in')
    }
  })

  app.get('/auth/github', passport.authenticate('github'))

  app.get('/auth/github/callback', 
    passport.authenticate('github', {
      failureRedirect: '/auth/failed'
    }),
    (req, res) => res.redirect('/')
  )

  app.get('/auth/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

const initPassport = () => {

  const GitHubStrategy = passportGitHub.Strategy;

  passport.serializeUser(  (user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(new GitHubStrategy({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:8080/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      setTimeout(() => {
        var user = { id: profile.id };
        cb(null, user)
      }, 500)
      //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //  return cb(err, user);
      //});
    }
  ))
  return passport.initialize()
}

export default (app) => {

  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))

  app.use(initPassport())
  app.use(passport.session())

  routes(app)

  return passport
}
