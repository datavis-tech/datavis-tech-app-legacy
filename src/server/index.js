import ShareDB from 'sharedb'
import { Server as WebSocketServer } from 'ws'
import JSONStream from 'websocket-json-stream'
import express from 'express'
import http from 'http'
import { port } from './config'
import auth from './auth'

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({server})
const sharedb = ShareDB()

auth(app)

wss.on('connection', (ws, req) =>
  sharedb.listen(new JSONStream(ws))
)

server.listen(port)
