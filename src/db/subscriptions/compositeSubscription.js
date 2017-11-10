export default(subscriptions) => {

  const subscriptionNames = Object.keys(subscriptions)

  return {
    init,
    tearDown
  }

  function init({onUpdate}) {

    const results = {}

    subscriptionNames.forEach(name => {

      subscriptions[name].init({
        onUpdate: result => {
          results[name] = result;
          onUpdate(results)
        }
      })

    })
  }

  function tearDown() {
    subscriptionNames.forEach(name => subscriptions[name].tearDown())
  }

}