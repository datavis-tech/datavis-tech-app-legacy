const ShareDB = require('sharedb')
const WebSocket = require('ws')
const JSONStream = require('websocket-json-stream')

module.exports = (expressApp, httpServer) => {
  const webSocketServer = new WebSocket.Server({ server: httpServer })
  const shareDB = ShareDB()

  webSocketServer.on('connection', (webSocket) => {
    shareDB.listen(new JSONStream(webSocket))
  })
}
