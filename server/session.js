const expressSession = require('express-session')
const connectRedis = require('connect-redis')
const cookie = require('cookie')
const cookieParser = require('cookie-parser')
const {
  redisHost,
  redisPort,
  sessionSecret
} = require('../config.js')

const RedisStore = connectRedis(expressSession)
const store = new RedisStore({
  host: redisHost,
  port: redisPort
})

// Gets the current session from a WebSocket connection.
// Draws from http://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
const getSession = (req, callback) => {
  const headers = req.headers

  // If there's no cookie, there's no session, so do nothing.
  if (!headers.cookie) {
    return callback()
  }

  // If there's a cookie, get the session id from it.
  const cookies = cookie.parse(headers.cookie)
  const sessionId = cookieParser.signedCookie(cookies['connect.sid'], sessionSecret)

  // Get the session from the store and pass it to the callback.
  store.get(sessionId, callback)
}

module.exports = {
  middleware: expressSession({
    store,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
  }),
  getSession
}
