import CompositeSubscription from '../compositeSubscription'
import CommentSubscription from './commentSubscription'
import Subscription from '../../../components/subscription'

// TODO test
export default () => {

  const subscription = CompositeSubscription()
  const subscribed = {}

  return {
    ...subscription,
    add
  }

  function add (ids) {
    ids
      .filter(id => !subscribed[id])
      .forEach(id => {
        subscribed[id] = true
        subscription.add({ [id]: CommentSubscription({id}) })
      })
  }
}
