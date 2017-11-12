import {DB_DOCUMENTS_COLLECTION} from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default ({id}) => (
  BaseQuerySubscription(
    {references: {$elemMatch: {id}}},
    DB_DOCUMENTS_COLLECTION
  )
)
