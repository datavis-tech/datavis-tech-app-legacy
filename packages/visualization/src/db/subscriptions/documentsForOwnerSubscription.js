import { DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

// this subscription returns documents that belongs to owner or those documents that are available for him as collaborator
export default ({owner}) => (
  BaseQuerySubscription(
    {
      $or: [
        {owner},
        {collaborators: {$elemMatch: {id: owner}}}
      ]
    },
    DB_DOCUMENTS_PROJECTION
  )
)
