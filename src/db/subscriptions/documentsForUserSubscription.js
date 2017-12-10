import { DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

// This subscription returns public documents for a given owner and documents on which viewer is collaborator
export default ({owner, id}) => (
  BaseQuerySubscription(
    {
      $or: [
        {
          $and: [
            {owner},
            {isPrivate: {$ne: true}}
          ]
        },
        {
          $and: [
            {owner},
            {collaborators: {$elemMatch: {id}}}
          ]
        }
      ]
    },
    DB_DOCUMENTS_PROJECTION
  )
)
