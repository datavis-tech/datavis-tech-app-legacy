import expressSession from 'express-session'
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import connectRedis from 'connect-redis'

import {
  SESSION_SECRET as secret,
  REDIS_HOST as host,
  REDIS_PORT as port
} from './config'

const RedisStore = connectRedis(expressSession)

export const store = new RedisStore({ host, port })

// Sets up session middleware on the Express app.
export const session = (app) => {
  app.use(expressSession({
    store,
    secret,
    resave: false,
    saveUninitialized: true
  }))
}

// Gets the current session from a WebSocket connection.
// Draws from http://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
export const getSession = (ws, callback) => {

  // If there's no cookie, there's no session, so do nothing.
  if(!ws.upgradeReq.headers.cookie) return callback() 

  // If there's a cookie, get the session id from it.
  const cookies = cookie.parse(ws.upgradeReq.headers.cookie)
  const sessionId = cookieParser.signedCookie(cookies['connect.sid'], secret)

  // Get the session from the store and pass it to the callback.
  store.get(sessionId, callback)
}
