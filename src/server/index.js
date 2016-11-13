import ShareDB from 'sharedb'
import { Server as WebSocketServer } from 'ws'
import JSONStream from 'websocket-json-stream'
import express from 'express'
import http from 'http'
import sharedbMongo from 'sharedb-mongo'
import { PORT, MONGO_URL } from './config'
import auth from './auth'
import { session, getSession } from './session'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({server})
const db = sharedbMongo(MONGO_URL)
const sharedb = ShareDB({db})

session(app)
auth(app)

wss.on('connection', (ws) => {
  getSession(ws, (err, session) => {

    // TODO use the user in this session for access control.
    console.log(JSON.stringify(session, null, 2))
  })
  sharedb.listen(new JSONStream(ws))
})

server.listen(PORT)
