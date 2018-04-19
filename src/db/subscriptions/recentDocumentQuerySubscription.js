import { DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default ({ type } = {}) => BaseQuerySubscription(
  {
    type,
    isPrivate: { $ne: true },
    $sort: { viewCount: -1 },
    $limit: 80,
  },
  DB_DOCUMENTS_PROJECTION
)
