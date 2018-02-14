const { DB_USERS_COLLECTION } = require('../../constants')

// Fetch the ShareDB document for this User.
const fetchUser = (userId, connection) => {
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
module.exports = fetchUser
