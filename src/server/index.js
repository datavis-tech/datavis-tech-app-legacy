import ShareDB from 'sharedb'
import { Server as WebSocketServer } from 'ws'
import JSONStream from 'websocket-json-stream'
import express from 'express'
import http from 'http'
import { port } from './config'
import auth from './auth'
import { session, getSession } from './session'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({server})
const sharedb = ShareDB()

session(app)
auth(app)

wss.on('connection', (ws) => {
  getSession(ws, (err, session) => {
    console.log(session)
  })
  sharedb.listen(new JSONStream(ws))
})

server.listen(port)
