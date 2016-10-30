import ShareDB from 'sharedb'
import { Server as WebSocketServer } from 'ws'
import JSONStream from 'websocket-json-stream'
import express from 'express'
import session from 'express-session'
import http from 'http'

import {
  port,
//  SESSION_SECRET
} from './config'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({server})

const sharedb = ShareDB()

wss.on('connection', (ws, req) =>
  sharedb.listen(new JSONStream(ws))
)

// TODO connect this to Express
//session({
//  secret: SESSION_SECRET,
//  resave: false,
//  saveUninitialized: true
//});

server.listen(port)
