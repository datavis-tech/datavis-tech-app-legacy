import shareDBClient from 'sharedb/lib/client'
import ReconnectingWebSocket from 'reconnecting-websocket'
import {
  DB_USERS_COLLECTION,
  DB_DOCUMENTS_COLLECTION,
  DB_DOCUMENTS_PROJECTION
} from './constants'
import uuidV4 from 'uuid/v4'

// Initialize the singleton connection.
let connection
if (process.browser) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const socket = new ReconnectingWebSocket(protocol + window.location.host)
  connection = new shareDBClient.Connection(socket)
}

// Find profile data by username.
// Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/client/Leaderboard.jsx
//
//  * `username` is used to look up the profile data.
//  * `update` is a function that can be invoked multiple times.
//    * If successful, `update` is passed the profile data.
//      * If profile data is updated, `update` will be called again with fresh data.
//    * If unsuccessful, `update` is passed `null`, meaning no matching user found.
//
// Returns the query object so it can be closed on component unmount.
const createProfileQuery = (username, update) => {
  const mongoQuery = { username }
  const query = connection.createSubscribeQuery(DB_USERS_COLLECTION, mongoQuery)
  const change = () => {
    if (query.results.length === 1) {
      update(query.results[0].data)
    } else {
      update(null)
    }
  }
  query.on('ready', change)
  query.on('changed', change)
  return query
}

// List documents by owner user id.
// Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/client/Leaderboard.jsx
//
//  * `userId` The user id of the owner of the documents.
//  * `update` A function that can be invoked multiple times.
//    * If successful, `update` is passed the list of documents.
//      * If document data is updated, `update` will be called again with fresh data.
//
// Returns the query object so it can be closed on component unmount.
const createDocumentsQuery = (owner, update) => {
  const mongoQuery = { owner }

  const query = connection.createSubscribeQuery(DB_DOCUMENTS_PROJECTION, mongoQuery)

  const change = () => {
    update(query.results)
  }
  query.on('ready', change)
  query.on('changed', change)
  return query
}

const subscribeToDocument = (id, callback) => {
  const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)
  doc.subscribe((err) => {
    callback(err, doc)
  })
}

const generateId = () => uuidV4().replace(/-/g, '')

const createDocument = ({ title, description, owner }) => {
  const id = generateId()
  const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)
  const content = ''

  const schemaVersion = 1
  doc.create({

    // Tracks versions of the document schema, for handling migrations.
    schemaVersion,

    // Human readable title, String.
    title,

    // Human readable description, String.
    description,

    // The id of the user who owns this document.
    owner,

    // The content of this document, String.
    content
  })

  return id
}

export {
  createDocument,
  createProfileQuery,
  createDocumentsQuery,
  subscribeToDocument
}