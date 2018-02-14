const fetchUserByStripeCustomerId = require('./fetchUserByStripeCustomerId')
const setSubscriptionPlan = require('../../db/actions/setSubscriptionPlan')
const setSubscriptionStatus = require('../../db/actions/setSubscriptionStatus')

const webhook = (expressApp, stripe, connection) => {
  // This gets invoked by Stripe.
  // See https://stripe.com/docs/webhooks
  expressApp.post('/stripe/webhook', (req, res) => {
    // TODO verify signature https://stripe.com/docs/webhooks/signatures
    const type = req.body.type

    switch (type) {
      case 'customer.subscription.created':
        console.log('Subscription created')
        const stripeSubscription = req.body.data.object
        const stripeCustomerId = stripeSubscription.customer
        const plan = stripeSubscription.plan.id
        const status = stripeSubscription.status

        console.log('customer = ' + stripeCustomerId)
        console.log('plan = ' + JSON.stringify(plan))
        console.log('status = ' + JSON.stringify(status))

        fetchUserByStripeCustomerId(stripeCustomerId, connection).then((doc) => {
          console.log('Fetched user by stripe customer id')
          setSubscriptionPlan(doc, plan)
          setSubscriptionStatus(doc, status)
          console.log('Updated user entry:')
          console.log(JSON.stringify(doc.data))
        })
        break
      case 'customer.subscription.deleted':
        // TODO update subscriptionPlan to 'null' in User entry in DB
        break
      case 'invoice.payment_succeeded':
        // TODO update subscriptionStatus to 'active' in User entry in DB
        break
      case 'invoice.payment_failed':
        // TODO update subscriptionStatus to 'pastDue' in User entry in DB
        break
    }
    res.send(200)
  })
}

module.exports = webhook
