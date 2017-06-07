// The main entry point for the server.
// Draws from:
//   https://github.com/zeit/next.js/blob/v3-beta/examples/with-next-routes/server.js
//   https://github.com/zeit/next.js/blob/v3-beta/examples/custom-server-express/server.js

const express = require('express')
const { createServer } = require('http')
const next = require('next')
const routes = require('../routes')
const session = require('./session')
const auth = require('./auth')
const shareDBSetup = require('./shareDBSetup')

const expressApp = express()
expressApp.use(session.middleware)
auth(expressApp)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handler = routes.getRequestHandler(nextApp)
expressApp.get('*', handler)

nextApp
  .prepare()
  .then(() => {
    const httpServer = createServer(expressApp)

    shareDBSetup(expressApp, httpServer)

    httpServer.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
