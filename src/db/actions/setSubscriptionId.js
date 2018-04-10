const { set } = require('./primitives')

// TODO test
module.exports = (shareDBDoc, subscriptionId) => (
  set({shareDBDoc, property: 'subscriptionId', item: subscriptionId})
)
