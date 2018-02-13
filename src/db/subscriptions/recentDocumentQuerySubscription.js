import { DB_DOCUMENTS_COLLECTION, VIS_DOC_TYPE } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

// TODO: test
export default () => BaseQuerySubscription(
  {
    type: VIS_DOC_TYPE,
    viewCount: {$gte: 10},
    $sort: {'_m.ctime': -1}
  },
  DB_DOCUMENTS_COLLECTION
)
