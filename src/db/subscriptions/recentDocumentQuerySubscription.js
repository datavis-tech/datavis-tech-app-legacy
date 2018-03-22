import { DB_DOCUMENTS_COLLECTION, VIS_DOC_TYPE } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default () => BaseQuerySubscription(
  {
    type: VIS_DOC_TYPE,
    viewCount: { $gte: 10 },
    isPrivate: { $ne: true },
    $sort: { '_m.ctime': -1 }
  },
  DB_DOCUMENTS_COLLECTION
)
