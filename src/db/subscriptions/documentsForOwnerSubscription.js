import { DB_DOCUMENTS_PROJECTION } from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default ({owner}) => (
  BaseQuerySubscription(
    {owner},
    DB_DOCUMENTS_PROJECTION
  )
)
