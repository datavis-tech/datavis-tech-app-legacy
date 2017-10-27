import shareDBClient from 'sharedb/lib/client'
import ReconnectingWebSocket from 'reconnecting-websocket'

// Initialize the singleton connection.
let connection
if (process.browser) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const socket = new ReconnectingWebSocket(protocol + window.location.host)
  connection = new shareDBClient.Connection(socket)
}
export default connection
