import BaseSubscription from '../baseSubscription'
import { DB_COMMENTS_COLLECTION } from '../../../constants'

// TODO test
export default ({id}) => (
  BaseSubscription(
    {id},
    {collection: DB_COMMENTS_COLLECTION}
  )
)
