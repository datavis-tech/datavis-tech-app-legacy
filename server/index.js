import express from 'express';

import passport from 'passport';
import passportGitHub from 'passport-github';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './config';

const GitHubStrategy = passportGitHub.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(JSON.stringify(profile, null, 2));
    setTimeout(function (){
      var user = {
        id: profile.id
      };
      return cb(null, user);
    }, 500);
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
  }
));

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

//app.post('api/login', passport.authenticate('github'), (req, res) => {
//  res.send('Hello World');
//});

//app.post('api/login', function() {
//});
//
//app.post('api/logout', function() {
//});

app.listen(port);

console.log('Listening on http://localhost:' + port);
