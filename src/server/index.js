import ShareDB from 'sharedb'
import { Server as WebSocketServer } from 'ws'
import JSONStream from 'websocket-json-stream'
import express from 'express'
import http from 'http'
import { port } from './config'
import auth from './auth'

// Draws from
// http://stackoverflow.com/questions/36842159/node-js-ws-and-express-session-how-to-get-session-object-from-ws-upgradereq
import cookie from 'cookie'
import cookieParser from 'cookie-parser'
import { SESSION_SECRET } from './config'
const getSessionFromWS = (ws, callback) => {
  const cookies = cookie.parse(ws.upgradeReq.headers.cookie)
  const sid = cookieParser.signedCookie(cookies['connect.sid'], SESSION_SECRET)
  // TODO get the session from the store
  //store.get(sid, (err, ss) => {
  //  store.createSession(ws.upgradeReq, ss)
  //})
  // TODO adopt https://www.npmjs.com/package/connect-redis
  callback(null, sid)
}


const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({server})
const sharedb = ShareDB()

auth(app)

wss.on('connection', (ws) => {
  getSessionFromWS(ws, (err, sid) => {
    console.log(sid)
  })
  sharedb.listen(new JSONStream(ws))
})

server.listen(port)
