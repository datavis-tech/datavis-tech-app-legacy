import { DB_DOCUMENTS_PROJECTION, VIS_DOC_TYPE, DATA_DOC_TYPE } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default () => BaseQuerySubscription(
  {
    $or: [
      { type: VIS_DOC_TYPE, viewCount: { $gte: 20 }},
      { type: DATA_DOC_TYPE, viewCount: { $gte: 3 }}
    ],
    isPrivate: { $ne: true },
    $sort: { viewCount: -1 }
  },
  DB_DOCUMENTS_PROJECTION
)
