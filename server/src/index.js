import ShareDB from 'sharedb'
import { Connection } from 'sharedb/lib/client'
import WebSocket, { Server } from 'ws'
import WebSocketJSONStream from 'websocket-json-stream'

const port = 8080

const sharedb = ShareDB()
const wss = new WebSocketServer({ port })
wss.on('connection', (ws, req) => {
  sharedb.listen(new WebSocketJSONStream(ws))
})
