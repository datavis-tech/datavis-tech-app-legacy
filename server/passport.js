import passport from 'passport';
import passportGitHub from 'passport-github';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './config';

const GitHubStrategy = passportGitHub.Strategy;

passport.serializeUser(  function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    setTimeout(function (){
      var user = {
        id: profile.id
      };
      cb(null, user);
    }, 500);
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
  }
));

export default passport;
