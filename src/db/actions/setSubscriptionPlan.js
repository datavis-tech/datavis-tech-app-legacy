import { set } from './primitives'

export const setSubscriptionPlan = (shareDBDoc, subscriptionPlan) => (
  set({shareDBDoc, property: 'subscriptionPlan', item: subscriptionPlan})
)
