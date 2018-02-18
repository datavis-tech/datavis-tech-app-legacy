import connection from '../../connection'
import { DB_DOCUMENTS_COLLECTION, VIS_DOC_TYPE } from '../../../constants'
import generateId from '../../generateId'
import visTemplateContent from './visTemplateContent'

const defaultContent = type => (
  type === VIS_DOC_TYPE
    ? visTemplateContent
    : ''
)

// Creates a new document in the ShareDB backend, returns the document ID.
export const createDocument = options => {

  // options
  const {

    // Required
    title,
    owner,
    type,

    // Optional
    description,
    content,
    references,
    forkedFrom,
    isPrivate

  } = options

  const id = generateId()
  const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)

  doc.create({

    // Tracks versions of the document schema, for handling migrations.
    // Version 2 introduced viewCount.
    schemaVersion: 2,

    // The id of the user who owns this document.
    owner,

    // Human readable title, String.
    title,

    // Human readable description, String.
    description: description || '',

    // The content of this document, String.
    content: content === undefined ? defaultContent(type) : content,

    // The datasets referenced by a visualization.
    // Array of objects containing:
    //  * fileName:String The local alias for the reference.
    //  * id:String The id of the referenced document.
    references,

    // The type of content the document contains.
    // It can be either "data", "vis", or (later) "tech".
    type: type,

    // The id of the document that this one was forked from, if any.
    forkedFrom,

    isPrivate: isPrivate || false,

    viewCount: 0
  })

  return doc
}
