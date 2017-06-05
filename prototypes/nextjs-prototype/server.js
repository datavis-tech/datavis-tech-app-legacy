// Draws from:
//  https://github.com/zeit/next.js/blob/master/examples/custom-server-express/server.js
//  https://github.com/share/sharedb/blob/master/examples/textarea/server.js
const http = require('http')
const express = require('express')
const expressSession = require('express-session')
const cookie = require('cookie')
const cookieParser = require('cookie-parser')
const connectRedis = require('connect-redis')

const next = require('next')
const ShareDB = require('sharedb')
const WebSocketServer = require('ws').Server
const JSONStream = require('websocket-json-stream')
const request = require('axios')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const RedisStore = connectRedis(expressSession)
const store = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})
const secret = process.env.SESSION_SECRET

// Draws from https://github.com/possibilities/next-github-auth/blob/60317b64f639cfd400ab8c932583341653cdb042/src/decorators/GithubContext.js#L6
const getGithubAccessToken = cookie => {
  const accessTokenCookie = cookie
    .split(';')
    .map(c => c.trim())
    .find(c => c.startsWith('githubAccessToken='))

  if (accessTokenCookie) {
    return accessTokenCookie.split('=').pop()
  }
}

// Draws from https://github.com/possibilities/next-github-auth/blob/60317b64f639cfd400ab8c932583341653cdb042/src/decorators/GithubContext.js#L21
const getGithubUser = githubAccessToken => {
  if (!githubAccessToken) {
    return
  }

  const url = 'https://api.github.com/user'
  const headers = { Authorization: `token ${githubAccessToken}` }
  const options = { headers }

  return request
    .get(url, options)
    .then(response => response.data)
}

app
  .prepare()
  .then(() => {
    const expressApp = express()
    const server = http.createServer(expressApp)
    const webSocketServer = new WebSocketServer({server})
    const shareDB = ShareDB()
    
    expressApp.use(expressSession({
      store,
      secret,
      resave: false,
      saveUninitialized: true
    }))

    // Gets the current session from a WebSocket connection.
    // Draws from http://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
    webSocketServer.on('connection', (ws) => {
      const cookies = cookie.parse(ws.upgradeReq.headers.cookie)
      const sessionId = cookieParser.signedCookie(cookies['connect.sid'], secret)
      const accessToken = getGithubAccessToken(ws.upgradeReq.headers.cookie)

      //console.log(user)
      store.get(sessionId, (err, session) =>{
        if(err){
          console.log(err)
        }

        let getUserIfNeeded
        // TODO switch to using Passport and un-adopt possibilities/next-github-auth
        if(!session.user){
          console.log('Saving user data to the session')
          getUserIfNeeded = getGithubUser(accessToken)
            .then(data => {
              session.user = data
              store.set(sessionId, session)
              return session.user
            })
        } else {
          console.log('Using user data from the session')
          getUserIfNeeded = Promise.resolve(session.user)
        }

        getUserIfNeeded
          .then(function (user){
            console.log(user.login + ' logged in')
            shareDB.listen(new JSONStream(ws))
          })
      })
    })

    expressApp.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
