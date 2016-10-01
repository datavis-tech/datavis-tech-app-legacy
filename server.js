import ShareDB from 'sharedb'
import { Server } from 'ws'
import JSONStream from 'websocket-json-stream'

const port = 8080

const sharedb = ShareDB()
new Server({ port }).on('connection', (ws, req) => {
  sharedb.listen(new JSONStream(ws))
})
