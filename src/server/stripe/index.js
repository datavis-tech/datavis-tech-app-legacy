const config = require('../../config')
const stripe = require('stripe')(config.stripeSecretKey)
const { backend } = require('../shareDB')
const upgrade = require('./upgrade')
const webhook = require('./webhook')

const connection = backend.connect()

module.exports = expressApp => {
  upgrade(expressApp, stripe, connection)
  webhook(expressApp, stripe, connection)
}
