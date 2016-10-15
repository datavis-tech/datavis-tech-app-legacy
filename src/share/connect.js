// This module exposes a singleton WebSocket connection to the ShareDB server.

import { Connection } from 'sharedb/lib/client'
import { port } from '../config'
const url = 'ws://' + window.location.hostname + ':' + port

export default function connect(){
  return new Promise((resolve, reject) => {

    const webSocket = new WebSocket(url)

    webSocket.addEventListener('open', () => {
      resolve(new Connection(webSocket))
    })

    webSocket.addEventListener('error', reject)
  })
}