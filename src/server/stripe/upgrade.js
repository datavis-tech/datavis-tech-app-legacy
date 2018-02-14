const fetchUser = require('./fetchUser')
const setStripeCustomerId = require('../../db/actions/setStripeCustomerId')

const upgrade = (expressApp, stripe, connection) => {

  // This gets invoked after the user clicks "Upgrade"
  // and enters their credit card details.
  expressApp.post('/stripe/earlyAdopterUpgrade', (req, res) => {
    const user = req.user

    if (!user) {
      return res.send({ error: 'You must be logged in to upgrade.' })
    }

    const { email, id } = req.body
    const userId = user.id

    stripe.customers.create({
      email,
      source: id
    }).then(customer => new Promise((resolve, reject) => {

      // Store the stripe customer id in our DB for later use.
      fetchUser(userId, connection)
        .then(doc => {

          // TODO wait for this write to complete before creating subscription.
          setStripeCustomerId(doc, customer.id)

          // TODO remove this timeout
          // See https://gitlab.com/curran/datavis-tech/issues/334
          setTimeout(() => {
            resolve(stripe.subscriptions.create({
              customer: customer.id,
              items: [{
                plan: 'early-adopter'
              }]
            }))
          }, 5000)
        })
        .catch(reject)
    })).then(subscription => {

      // User plan will be updated in DB later via Webhook.
      res.send({ success: true })
    }).catch(error => {
      res.send({ error })
    })
  })
}

module.exports = upgrade
