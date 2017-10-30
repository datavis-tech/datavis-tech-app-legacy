import {DB_USERS_COLLECTION} from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default class ProfileSubscription {

  constructor () {
    this.__subscription = BaseQuerySubscription(DB_USERS_COLLECTION, ({id}) => ({id}))
  }

  init (...args) {
    this.__subscription.init(...args)
  }

  tearDown () {
    this.__subscription.tearDown()
  }

}
