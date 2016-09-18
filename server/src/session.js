import session from 'express-session';

export default session({
  secret: 'jhfadsnfjdkshare',
  resave: false,
  saveUninitialized: true
});
