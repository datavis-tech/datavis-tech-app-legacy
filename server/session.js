const expressSession = require('express-session')
const connectRedis = require('connect-redis')
const config = require('../config.js')

const RedisStore = connectRedis(expressSession)
const store = new RedisStore({
  host: config.redisHost,
  port: config.redisPort
})

module.exports = {
  middleware: expressSession({
    store,
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
  })
}
