const ShareDB = require('sharedb')
const WebSocket = require('ws')
const JSONStream = require('websocket-json-stream')
const ShareDBMongo = require('sharedb-mongo')
const { getSession } = require('./session')
const { mongoURL } = require('../config')
const {
  DB_DOCUMENTS_PROJECTION,
  DB_DOCUMENTS_COLLECTION
} = require('../modules/constants')

const backend = ShareDB({
  db: ShareDBMongo(mongoURL)
})

// Add a projection that only includes certain fields.
// This is for the document list page, so that the entire content
// of each document is not transferred to the browser.
backend.addProjection(DB_DOCUMENTS_PROJECTION, DB_DOCUMENTS_COLLECTION, {
  id: true,
  schemaVersion: true,
  title: true,
  description: true,
  owner: true
})

const setup = (httpServer) => {
  const webSocketServer = new WebSocket.Server({
    server: httpServer
  })

  // When a new WebSocket connection is made,
  webSocketServer.on('connection', (webSocket, request) => {

    // look up the session from the upgrade reques cookie,
    getSession(request, (err, session) => {
      if (err) {
        return console.error(err)
      }

      // then expose the session on the upgrade request object,
      // so the access control middleware can access it.
      request.session = session

      // Connect the WebSocket to ShareDB.
      backend.listen(new JSONStream(webSocket), request)
    })
  })
}

module.exports = { setup, backend }
