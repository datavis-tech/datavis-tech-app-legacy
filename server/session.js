const expressSession = require('express-session')
const connectRedis = require('connect-redis')

// TODO externalise these
const host = '127.0.0.1'
const port = '6379'
const secret = 'dafhjdkasfhdjkashfjksa'

const RedisStore = connectRedis(expressSession)
const store = new RedisStore({ host, port })

module.exports = {
  middleware: expressSession({
    store,
    secret,
    resave: false,
    saveUninitialized: true
  })
}
