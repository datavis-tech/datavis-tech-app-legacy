import connection from '../../modules/shareDBConnection'
import { DB_DOCUMENTS_COLLECTION } from '../../modules/constants'

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

  // TODO use a projection here to exclude the full contents of each document
  const query = connection.createSubscribeQuery(DB_DOCUMENTS_COLLECTION, mongoQuery)

  const change = () => {
    update(query.results)
  }
  query.on('ready', change)
  query.on('changed', change)
  return query
}

export default createDocumentsQuery
