const ShareDB = require('sharedb')
const WebSocket = require('ws')
const JSONStream = require('websocket-json-stream')
const { getSession } = require('./session')

const backend = ShareDB()

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
