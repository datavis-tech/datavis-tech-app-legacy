const fetchUser = require('./fetchUser')
const setStripeCustomerId = require('../../db/actions/setStripeCustomerId')

const upgrade = (expressApp, stripe, connection) => {

  // This gets invoked after the user clicks "Upgrade"
  // and enters their credit card details.
  expressApp.post('/stripe/earlyAdopterUpgrade', (req, res) => {
    const { email, id, user } = req.body

    if (!user) {
      return res.send({ error: 'You must be logged in to upgrade.' })
    }

    const userId = user.id

    stripe.customers.create({
      email,
      source: id
    }).then(customer => {

      // Store the stripe customer id in our DB for later use.
      fetchUser(userId, connection)
        .then(doc => setStripeCustomerId(doc, customer.id))

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
}

module.exports = upgrade
