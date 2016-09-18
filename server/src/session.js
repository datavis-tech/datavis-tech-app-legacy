import session from 'express-session';
import { SESSION_SECRET } from './config';

export default session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
});
