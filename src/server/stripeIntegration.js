const config = require('../config.js')
const stripe = require('stripe')(config.stripeSecretKey)
const { DB_USERS_COLLECTION } = require('../constants')
const { setStripeCustomerId, setSubscriptionPlan, setSubscriptionStatus } = require('../db/actions')
const { backend } = require('./shareDB')

const connection = backend.connect()

// Fetch the ShareDB document for this User.
const fetchUser = userId => {
  return new Promise((resolve, reject) => {
    const doc = connection.get(DB_USERS_COLLECTION, userId)
    doc.fetch(err => {
      if (err) {
        return reject(err)
      }

      // If User entry doesn't exist.
      if (doc.type === null) {
        return reject(new Error('User does not exist with id: ' + userId))
      }

      resolve(doc)
    })
  })
}

// Fetch the ShareDB document for a User by Stripe customer id.
const fetchUserByStripeCustomerId = stripeCustomerId => {
  return new Promise((resolve, reject) => {
    connection.createFetchQuery(
      DB_USERS_COLLECTION,
      { stripeCustomerId },
      {},
      (err, users) => {
        if (err) {
          return reject(err)
        }
        if (users.length !== 1) {
          return reject(new Error(`Expected exactly one user to have customer id ${stripeCustomerId}, found ${users.length}.`))
        }
        return resolve(users[0])
      }
    )
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

      // Store the stripe customer id in our DB for later use.
      fetchUser(userId).then(doc => setStripeCustomerId(doc, customer.id))

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

        fetchUserByStripeCustomerId(stripeCustomerId).then((doc) => {
          console.log('Fetched user by stripe customer id')
          setSubscriptionPlan(doc, plan)
          setSubscriptionStatus(doc, status)
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
