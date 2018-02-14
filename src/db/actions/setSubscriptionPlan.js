const { set } = require('./primitives')
module.exports = (shareDBDoc, subscriptionPlan) => (
  set({shareDBDoc, property: 'subscriptionPlan', item: subscriptionPlan})
)
