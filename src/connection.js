// This module exposes a singleton WebSocket connection to the ShareDB server.

import { Connection } from 'sharedb/lib/client'
import { port } from './config'
const url = 'ws://' + window.location.hostname + ':' + port
const webSocket = new WebSocket(url)
const connection = new Connection(webSocket)
export default connection
