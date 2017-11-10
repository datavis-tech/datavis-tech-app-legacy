import DocumentSubscription from './documentSubscription'

// Manages subscriptions to multiple ShareDB documents.
export default ({ids}) => {
  let subscriptions = []
  const docs = []

  // Returns true if all documents corresponding to ids are defined.
  const allDocsSubscribed = ids => ids.every((id, i) => docs[i])

  return {
    init,
    tearDown
  }

  function init ({onUpdate, onError}) {
    subscriptions = ids.map((id, i) => {
      const subscription = DocumentSubscription({id})

      subscription.init({
        onUpdate: (doc) => {
          docs[i] = doc
          if (allDocsSubscribed(ids)) {
            onUpdate(docs)
          }
        },
        onError
      })

      return subscription
    })
  }

  function tearDown () {
    subscriptions.forEach(subscription => {
      subscription.tearDown()
    })
  }

}
