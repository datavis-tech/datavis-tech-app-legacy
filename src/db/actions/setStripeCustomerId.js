import { set } from './primitives'

export const setStripeCustomerId = (shareDBDoc, stripeCustomerId) => (
  set({shareDBDoc, property: 'stripeCustomerId', item: stripeCustomerId})
)
