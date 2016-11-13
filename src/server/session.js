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

// Gets the session from the WebSocket upgrade request.
// Draws from http://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
export const getSession = (ws, callback) => {
  const cookies = cookie.parse(ws.upgradeReq.headers.cookie)
  const sid = cookieParser.signedCookie(cookies['connect.sid'], SESSION_SECRET)
  sessionStore.get(sid, (err, session) => {
    if(!session) return callback(null, null)
    if(err) return callback(err)
    sessionStore.createSession(ws.upgradeReq, session)
    callback(null, ws.upgradeReq.session)
  })
}
