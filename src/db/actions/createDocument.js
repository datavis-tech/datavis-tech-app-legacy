import connection from '../connection'
import { DB_DOCUMENTS_COLLECTION } from '../../constants'
import generateId from '../generateId'

// Creates a new document in the ShareDB backend,
// returns the document ID.
export const createDocument = options => {

  // options
  const {

    // Required
    title,
    description,
    owner,

    // Optional
    content,
    references,
    type,
    forkedFrom,
    isPrivate

  } = options

  const id = generateId()
  const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)

  doc.create({

    // Tracks versions of the document schema, for handling migrations.
    schemaVersion: 1,

    // Human readable title, String.
    title,

    // Human readable description, String.
    description,

    // The id of the user who owns this document.
    owner,

    // The content of this document, String.
    content: content || '',

    // The datasets referenced by a visualization.
    // Array of objects containing:
    //  * fileName:String The local alias for the reference.
    //  * id:String The id of the referenced document.
    references,

    // The type of content the document contains.
    // It can be either "data", "vis", or (maybe later) "tech".
    // If not defined, the value is treated as "vis".
    type,

    // The id of the document that this one was forked from, if any.
    forkedFrom,

    isPrivate: isPrivate || false
  })

  return doc
}