/**
 * This module exposes an asynchronous function that
 * makes a WebSocket connection to the ShareDB server.
 */
import { Connection } from 'sharedb/lib/client'
const url = 'ws://' + window.location.hostname + '/api'

export default function connect(){
  return new Promise((resolve, reject) => {

    const webSocket = new WebSocket(url)

    webSocket.addEventListener('open', () => {
      resolve(new Connection(webSocket))
    })

    webSocket.addEventListener('error', reject)
  })
}
