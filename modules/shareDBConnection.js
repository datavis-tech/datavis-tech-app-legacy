import sharedb from 'sharedb/lib/client'
import ReconnectingWebSocket from 'reconnecting-websocket'

let connection

if(process.browser){
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const socket = new ReconnectingWebSocket(protocol + window.location.host)
  connection = new sharedb.Connection(socket)
}

export default connection
