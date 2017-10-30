import {DB_USERS_COLLECTION} from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default () => BaseQuerySubscription(DB_USERS_COLLECTION, ({id}) => ({id}))
