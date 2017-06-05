import ShareDB from 'sharedb'
import { Server as WebSocketServer } from 'ws'
import JSONStream from 'websocket-json-stream'
import express from 'express'
import http from 'http'
import sharedbMongo from 'sharedb-mongo'
import { PORT, MONGO_URL } from './config'
import auth from './auth'
import { session, getSession } from './session'
import get from 'lodash/get'

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

// Tests whether the given op increments the view count.
const incrementsView = (op) => (
  get(op, 'op[0].p[0]') === 'views'
  &&
  get(op, 'op[0].na') === 1
)

sharedb.use('apply', (request, done) => {

  // Unpack the ShareDB request object.
  const {
    op,
    agent: { session },
    snapshot
  } = request

  // Get the id of the currently logged in user from the session.
  const userId = get(session, 'passport.user.id')

  // Get the owner id.
  const owner = (
    op.create
    ? (op.create.data || {}) // Handle the case of a creation op.
    : snapshot.data // Handle ops on an existing document.
  ).owner

  // Access control rules:

  // Allow anyone to increment the view count for any document.
  if(incrementsView(op)){
    return done()
  }

  // For all ops, owner must be the logged in user.
  else if(!userId || (owner !== userId)) {
    return done("Error: Document owner must match currently logged in user.")
  }

  done()
})


server.listen(PORT)
