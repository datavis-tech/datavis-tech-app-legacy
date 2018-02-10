const config = require('../config.js')
const stripe = require('stripe')(config.stripeSecretKey)

module.exports = (expressApp) => {

  // This gets invoked after the user clicks "Upgrade"
  // and enters their credit card details.
  expressApp.post('/stripe/earlyAdopterUpgrade', (req, res) => {
    const { email, id } = req.body
    stripe.customers.create({
      email,
      source: id
    }).then(customer => stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: 'early-adopter'
      }]
    })).then(subscription => {
      // User plan will be updated in DB via Webhook.
      res.send({ success: true })
    }).catch(error => {
      res.send({ error })
    })
  })

  // This gets invoked by Stripe.
  // See https://stripe.com/docs/webhooks
  expressApp.post('/stripe/webhook', (req, res) => {
    // TODO verify signature https://stripe.com/docs/webhooks/signatures
    console.log(req.body)
    const type = req.body.type
    switch (type) {
      case 'customer.subscription.created':
        // TODO update subscriptionPlan to 'earlyAdopter' in User entry in DB
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
