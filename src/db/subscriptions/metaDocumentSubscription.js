import { DB_META_DOCUMENTS_COLLECTION } from '../../constants'
import BaseSubscription from './baseSubscription'

export default ({id}) => (
  BaseSubscription(
    {id},
    {
      collection: DB_META_DOCUMENTS_COLLECTION,
      template: {
        viewCount: 0
      }
    }
  )
)
