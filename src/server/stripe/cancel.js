const { subscriptionId } = require('../../db/accessors')
const fetchUser = require('./fetchUser')

const cancel = (expressApp, stripe, connection) => {

  // This gets invoked after the user clicks "Downgrade"
  expressApp.post('/stripe/cancel', (req, res) => {
    const user = req.user

    if (!user) {
      return res.send({ error: 'You must be logged in to cancel.' })
    }

    const userId = user.id

    fetchUser(userId, connection)
      .then(doc => {
        const id = subscriptionId(doc)
        return id ? Promise.resolve(id) : Promise.reject(new Error('There is no active subscriptions.'))
      })
      .then(id => stripe.subscriptions.del(id))
      .then(() => res.send({ success: true }))
      .catch(error => res.send({ error }))
  })
}

module.exports = cancel
