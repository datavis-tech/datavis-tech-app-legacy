const config = require('../config.js')
const stripe = require('stripe')(config.stripeKey)

module.exports = (expressApp) => {
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
      // TODO update User entry with plan flag set
      res.send({ success: true })
    }).catch(error => {
      res.send({ error })
    })
  })
}
