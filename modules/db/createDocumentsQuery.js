import connection from './connection'
import { DB_DOCUMENTS_PROJECTION } from '../constants'

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

export default createDocumentsQuery
