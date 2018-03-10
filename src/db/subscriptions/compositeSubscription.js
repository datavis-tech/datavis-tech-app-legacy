export default subscriptions => {
    
    const results = {}
    const initializedSubscriptions = {}
    const subscriptionNames = []
    let onUpdateHandler = null

    return {
        init,
        add,
        tearDown
    }

    function init({ onUpdate }) {
      onUpdateHandler = onUpdate
      add(subscriptions)
    }

    function tearDown() {
        subscriptionNames.forEach(name => initializedSubscriptions[name].tearDown())
    }

    // TODO test
    function add(newlyAddedSubscriptions) {
      if (onUpdateHandler && newlyAddedSubscriptions) {
        const newlyAddedSubscriptionsNames = Object.keys(newlyAddedSubscriptions)
        subscriptionNames.push(...newlyAddedSubscriptionsNames)

        newlyAddedSubscriptionsNames.forEach(name => {

          initializedSubscriptions[name] = newlyAddedSubscriptions[name]
          
          newlyAddedSubscriptions[name].init({
              onUpdate: result => {
                  results[name] = result
                  onUpdateHandler(results)
              }
          })

        })
      }
    }
}
