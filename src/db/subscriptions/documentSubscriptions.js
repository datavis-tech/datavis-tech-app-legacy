import DocumentSubscription from './documentSubscription'

// Manages subscriptions to multiple ShareDB documents.
export default () => {
  let subscriptions = []

  return {
    init,
    tearDown
  }

  function init ({ids}, {onUpdate, onError}) {
    subscriptions = ids.map((id, i) => {
      const subscription = DocumentSubscription()

      //subscription.init({id}, {
      //  onUpdate: docs => {
      //
      //  },
      //  onError
      //})

      return subscription
    })
  }

  function tearDown () {
    subscriptions.forEach(subscription => {
      subscription.tearDown()
    })
  }

}
