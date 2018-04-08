const config = require('../../config')
const stripe = require('stripe')(config.stripeSecretKey)
const upgrade = require('./upgrade')
const cancel = require('./cancel')
const webhook = require('./webhook')

module.exports = (expressApp, backend) => {
  const connection = backend.connect()
  upgrade(expressApp, stripe, connection)
  cancel(expressApp, stripe, connection)
  webhook(expressApp, stripe, connection)
}
