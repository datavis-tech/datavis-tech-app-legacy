const { set } = require('./primitives')
module.exports = (shareDBDoc, subscriptionStatus) => (
  set({shareDBDoc, property: 'subscriptionStatus', item: subscriptionStatus})
)
