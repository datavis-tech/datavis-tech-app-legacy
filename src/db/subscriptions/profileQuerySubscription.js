import {DB_USERS_COLLECTION} from '../../constants'
import BaseQuerySubscription from './baseQuerySubscription'

export default (params) => {
  const subscription = BaseQuerySubscription(params, DB_USERS_COLLECTION)

  return {...subscription, init}

  function init ({onUpdate, onError}) {
    subscription.init({
      onUpdate: profiles => onUpdate(profiles.length ? profiles[0] : null),
      onError
    })
  }
}
