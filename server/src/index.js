import express from 'express';
import session from './session';
import passport from './passport';

const app = express();
const port = 3000;

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  if(req.user){
    res.send('Logged in');
  } else {
    res.send('Not logged in');
  }
});

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/failed' }),
  (req, res) => res.redirect('/'));

app.get('/auth/failed', (req, res) => {
  res.send('Authentication failed');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port);

console.log('Listening on http://localhost:' + port);
