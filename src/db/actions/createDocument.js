import connection from '../connection'
import { DB_DOCUMENTS_COLLECTION } from '../../constants'
import generateId from '../generateId'

// Creates a new document in the ShareDB backend,
// returns the document ID.
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

    // Another field "references" may be added later,
    // which will be an array of objects containing:
    //  * fileName:String The local alias for the reference.
    //  * id:String The id of the referenced document.

    // Another field "type" may be added later.
    // It can be either "data", "vis", or "tech".
    // If not present, the value is treated as "vis".
  })

  return id
}

export default createDocument
