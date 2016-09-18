import express from 'express';
import session from './session';
import passport from './passport';

const app = express();
const port = 3000;

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  if(req.session.passport){
    res.send('Logged in');
  } else {
    res.send('Not logged in');
  }
});

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) { res.redirect('/'); });

app.listen(port);

console.log('Listening on http://localhost:' + port);
