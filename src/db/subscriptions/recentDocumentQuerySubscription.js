import { DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default ({ type } = {}) => BaseQuerySubscription(
  {
    type,
    viewCount: { $gte: 20 },
    isPrivate: { $ne: true },
    $sort: { viewCount: -1 }
  },
  DB_DOCUMENTS_PROJECTION
)
