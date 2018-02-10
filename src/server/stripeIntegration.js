const config = require('../config.js')
const stripe = require('stripe')(config.stripeSecretKey)
const { backend } = require('./shareDB')

const connection = backend.connect()

// Fetch the ShareDB document for this User.
const fetchUser = userId => {
  return new Promise((resolve, reject) => {
    const doc = connection.get(DB_USERS_COLLECTION, userId)
    doc.fetch(err => {
      if (err) {
        reject(err)
        return
      }

      // If User entry doesn't exist.
      if (doc.type === null) {
        reject(new Error('User does not exist with id: ' + userId))
        return
      }

      resolve(doc)
    })
  })
}

module.exports = (expressApp) => {

  // This gets invoked after the user clicks "Upgrade"
  // and enters their credit card details.
  expressApp.post('/stripe/earlyAdopterUpgrade', (req, res) => {
    const { email, id, user } = req.body

    if (!user) {
      res.send({ error: 'You must be logged in to upgrade.' })
    }

    const userId = user.id

    stripe.customers.create({
      email,
      source: id
    }).then(customer => {

      // TODO store the stripe customer id in our DB for later use.
      //fetchUser(userId).then(doc => setStripeCustomerId(doc, customer.id))

      return stripe.subscriptions.create({
        customer: customer.id,
        items: [{
          plan: 'early-adopter'
        }]
      })
    }).then(subscription => {

      // User plan will be updated in DB later via Webhook.
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
