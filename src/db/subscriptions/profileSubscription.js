import {DB_USERS_COLLECTION} from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default () => {
  const subscription = BaseQuerySubscription(DB_USERS_COLLECTION, ({id}) => ({id}))

  return {...subscription, init}

  function init (params, {onUpdate, onError}) {
    subscription.init(params, {
      onUpdate: (profiles) => profiles.length ? onUpdate(profiles[0]) : onUpdate(null),
      onError
    })
  }
}
