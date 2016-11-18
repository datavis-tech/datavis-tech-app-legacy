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
    if(err) return console.log(err)
    ws.upgradeReq.session = session
    sharedb.listen(new JSONStream(ws), ws.upgradeReq)
  })
})

// Middleware usage inspired by
// https://github.com/dmapper/sharedb-access/blob/master/lib/index.js

// Expose the session from initial connection as agent.session.
sharedb.use('connect', (request, done) => {
  request.agent.session = request.req.session
  done()
})

sharedb.use('apply', (request, done) => {

  const { op, agent: { session } } = request

  if(op.create) {
    const user = session.passport.user
    const doc = op.create.data
    doc.owner = user.id
    //console.log(user)
    //console.log(doc)
  }

  done()
})

server.listen(PORT)
