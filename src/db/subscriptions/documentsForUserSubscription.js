import { DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

// This subscription returns public documents for a given owner
// and documents on which viewer is collaborator.
//
// `owner` is the user id for the user who owns the documents.
// `id` is the user id of the user who is viewing,
//      or empty string if there is no user authenticated.
export default ({owner, id}) => (
  BaseQuerySubscription(
    {
      $and: [
        {owner},
        {
          $or: [
            {isPrivate: {$ne: true}},
            {collaborators: {$elemMatch: {id}}}
          ]
        }
      ]
    },
    DB_DOCUMENTS_PROJECTION
  )
)
