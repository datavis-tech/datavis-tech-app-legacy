// const config = require('../config.js')
// const stripe = require('stripe')('pk_test_Y4thsPih1A0NNySQzyX7DQEi')

module.exports = (expressApp) => {
  expressApp.post('/stripe/earlyAdopterUpgrade', (req, res) => {
    const { email, id } = req.body
    console.log(email, id)
    // TODO create customer
    // TODO create subscription
    // TODO update user in DB with plan field changed
    res.send({
      foo: 'bar'
    })
  })
}
