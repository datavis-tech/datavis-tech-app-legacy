import { DB_COMMENTS_COLLECTION } from '../../constants'
import connection from '../connection'
import generateId from '../generateId'

export const createComment = ({ author, relatedDocument, text }) => {
  const id = generateId()
  const comment = connection.get(DB_COMMENTS_COLLECTION, id)

  comment.create({
    // Tracks versions of the document schema, for handling migrations.
    // Version 1 - initial.
    schemaVersion: 1,

    // The id of the user who wrote this comment.
    author,

    // The id of document which is related to this comment
    relatedDocument,

    // The body of comment
    text
  })

  return comment
}
