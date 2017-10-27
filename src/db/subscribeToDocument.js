import { DB_DOCUMENTS_COLLECTION } from '../constants'
import connection from './connection'

const subscribeToDocument = (id, callback) => {
  const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)
  doc.subscribe((err) => {
    callback(err, doc)
  })
}

export default subscribeToDocument
