import {DB_DOCUMENTS_COLLECTION} from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default ({ id, userId }) => (
  BaseQuerySubscription(
    {
      $and: [
        { references: { $elemMatch: { id } } },
        {
          $or: [
            { isPrivate: {$ne: true} },
            { collaborators: { $elemMatch: { id: userId } } },
            { owner: userId }
          ]
        }
      ]
    },
    DB_DOCUMENTS_COLLECTION
  )
)
