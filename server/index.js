import express from 'express';
import passport from './passport';

const app = express();
const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  console.log(req.session);
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
