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
  getSession(ws, (err) => {
    if(err) return console.log(err)
    sharedb.listen(new JSONStream(ws), ws.upgradeReq)
  })
})

// Expose the session from initial connection as agent.session.
sharedb.use('connect', (request, callback) => {
  request.agent.session = request.req.session
  callback()
})

sharedb.use('apply', (request, callback) => {

  // TODO use request.agent.session for access control.
  //console.log(request.agent.session)

  callback()
})

server.listen(PORT)
