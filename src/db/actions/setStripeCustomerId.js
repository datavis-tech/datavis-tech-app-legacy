const { set } = require('./primitives')
module.exports = (shareDBDoc, stripeCustomerId) => (
  set({shareDBDoc, property: 'stripeCustomerId', item: stripeCustomerId})
)
