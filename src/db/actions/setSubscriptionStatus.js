import { set } from './primitives'

export const setSubscriptionStatus = (shareDBDoc, subscriptionStatus) => (
  set({shareDBDoc, property: 'subscriptionStatus', item: subscriptionStatus})
)
