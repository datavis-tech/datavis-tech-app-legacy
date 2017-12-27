import { DB_DOCUMENTS_COLLECTION, DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseSubscription from './baseSubscription'

export default ({id}, {projection = false} = {}) => (
  BaseSubscription(
    {id},
    {collection: projection ? DB_DOCUMENTS_PROJECTION : DB_DOCUMENTS_COLLECTION}
  )
)
