const ShareDB = require('sharedb')
const WebSocket = require('ws')
const JSONStream = require('websocket-json-stream')
const accessControl = require('./accessControl')
const { getSession } = require('./session')

module.exports = (expressApp, httpServer) => {
  const webSocketServer = new WebSocket.Server({ server: httpServer })
  const shareDB = ShareDB()

  // Set up access control middleware on ShareDB.
  accessControl(shareDB)

  // When a new WebSocket connection is made,
  webSocketServer.on('connection', (webSocket, req) => {

    // look up the session from the upgrade request cookie,
    getSession(req, (err, session) => {

      // then expose the session on the upgrade request object,
      // so the access control middleware can access it.
      req.session = session

      // Connect the WebSocket to ShareDB.
      shareDB.listen(new JSONStream(webSocket), req)
    })
  })
}
