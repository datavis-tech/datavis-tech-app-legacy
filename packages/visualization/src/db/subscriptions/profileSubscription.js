import { DB_USERS_COLLECTION as collection } from '../../constants'
import BaseSubscription from './baseSubscription'

export default ({id}) => BaseSubscription({id}, {collection})
