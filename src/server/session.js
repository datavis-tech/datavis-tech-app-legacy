import expressSession from 'express-session'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import { SESSION_SECRET } from './config'

// Gets the session from the WebSocket on connection.
// Draws from
// http://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
export const getSession = (ws, callback) => {
  const cookies = cookie.parse(ws.upgradeReq.headers.cookie)
  const sid = cookieParser.signedCookie(cookies['connect.sid'], SESSION_SECRET)
  // TODO get the session from the store
  //store.get(sid, (err, ss) => {
  //  store.createSession(ws.upgradeReq, ss)
  //})
  // TODO adopt https://www.npmjs.com/package/connect-redis
  callback(null, sid)
}

export const session = (app) => {
  app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))
}
