import { DB_DOCUMENTS_COLLECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

// TODO: test
export default () => BaseQuerySubscription(
  {
    viewCount: {$gte: 10},
    $sort: {'_m.mtime': -1}
  },
  DB_DOCUMENTS_COLLECTION
)
