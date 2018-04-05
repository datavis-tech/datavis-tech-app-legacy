import { DB_DOCUMENTS_PROJECTION, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../constants'
import { title, id } from '../accessors'
import connection from '../connection'

export default async function queryReferencesForCompletion (userId, pattern) {
  return new Promise((resolve, reject) => (
    connection.createFetchQuery(
      DB_DOCUMENTS_PROJECTION,
      createQuery(userId, pattern),
      {},
      (err, results) => {
        err ? reject(err) : resolve(results.map(toAutocompletionEntry))
      }
    )
  ))
}

function createQuery (userId, pattern) {
  return {
    $and: [
      { type: { $in: [DATA_DOC_TYPE, TECH_DOC_TYPE] } },
      { $or: [
        { title: { $regex: `.*${pattern}.*` } },
        { _id: pattern }
      ] },
      { $or: [
        { owner: userId },
        { collaborators: { $elemMatch: { id: userId } } }
      ] }
    ]
  }
}

function toAutocompletionEntry (document) {
  return { title: title(document), id: id(document) }
}
