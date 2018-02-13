const { DB_USERS_COLLECTION } = require('../../constants')

// Fetch the ShareDB document for a User by Stripe customer id.
const fetchUserByStripeCustomerId = (stripeCustomerId, connection) => {
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

module.exports = fetchUserByStripeCustomerId
