import expressSession from 'express-session'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import {
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PORT
} from './config'
import connectRedis from 'connect-redis'

const RedisStore = connectRedis(expressSession)

export const sessionStore = new RedisStore({
  host: REDIS_HOST,
  port: REDIS_PORT
})

// Sets up session middleware on the Express app.
export const session = (app) => {
  app.use(expressSession({
    store: sessionStore,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }))
}

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
