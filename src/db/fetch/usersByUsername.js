import { DB_USERS_COLLECTION, AUTOCOMPLETER_LIMIT } from '../../constants'
import BaseQuery from './baseQuery'

export default () => BaseQuery(DB_USERS_COLLECTION, ({value}) => (
  {
    username: {$regex: `^${value}`},
    $limit: AUTOCOMPLETER_LIMIT
  }
))
