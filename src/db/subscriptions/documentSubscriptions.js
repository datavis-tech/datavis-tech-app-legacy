import DocumentSubscription from './documentSubscription'

// Manages subscriptions to multiple ShareDB documents.
export default () => {
  let subscriptions = []
  const docs = []

  // Returns true if all documents corresponding to ids are defined.
  const allDocsSubscribed = ids => ids.every((id, i) => docs[i])

  return {
    init,
    tearDown
  }

  function init ({ids}, {onUpdate, onError}) {
    if (ids.length > 0) {
      subscriptions = ids.map((id, i) => {
        const subscription = DocumentSubscription()

        subscription.init({id}, {
          onUpdate: ([doc]) => {
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
  }

  function tearDown () {
    subscriptions.forEach(subscription => {
      subscription.tearDown()
    })
  }

}
