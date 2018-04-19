// The main entry point for the server.
// Draws from:
//   https://github.com/zeit/next.js/blob/v3-beta/examples/with-next-routes/server.js
//   https://github.com/zeit/next.js/blob/v3-beta/examples/custom-server-express/server.js

const express = require('express')
const bodyParser = require('body-parser')
const { createServer } = require('http')
const next = require('next')
const routes = require('../routes')
const session = require('./session')
const shareDB = require('./shareDB')
const authorization = require('./authorization')
const accessControl = require('./_accessControl')
const addUserToOps = require('./addUserToOps')
const stripe = require('./stripe')
const thumbnails = require('./thumbnails')
const oembed = require('./oembed')
const createEmbedDocsHandler = require('./embed/handler')
const visualizationExport = require('./visualizationExport')

const expressApp = express()

// Enable CORS for cross-origin embedding (required by Embedly).
expressApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json())

expressApp.use(session.middleware)

authorization(expressApp)
accessControl(shareDB.backend)
addUserToOps(shareDB.backend)
stripe(expressApp, shareDB.backend)
thumbnails(expressApp, shareDB.backend)
oembed(expressApp, shareDB.backend)
visualizationExport(expressApp, shareDB.backend)

// Set up the Next.js server, informing it whether we are in dev mode,
// and also informing it that it should look for pages under the src directory.
// If `dev` is true, the Next.js server will watch for changes.
const nextApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: 'src'
})

// Serve static assets.
expressApp.use('/static', express.static('static'))

// TODO rewrite to stripe and visualizationExport style insted of setting path directly
// Set up the NextJS Express handler.
expressApp.get('/vis/:id/embed', createEmbedDocsHandler(shareDB.backend))

const handler = routes.getRequestHandler(nextApp)
expressApp.get('*', handler)

nextApp
  .prepare()
  .then(() => {
    const httpServer = createServer(expressApp)
    shareDB.setup(httpServer)
    httpServer.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })

// launch services
require('./thumbnails/thumbnailGenerationService')()
require('./changeTracking/updateVisOnReferenceChangeService')()
require('./changeTracking/throttleUpdatesService')()
require('./missingThumbnailsDetector/detectMissingThumbnailsService')()
