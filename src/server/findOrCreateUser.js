const { DB_USERS_COLLECTION } = require('../constants')
const { backend } = require('./shareDB')

// A reusable ShareDB connection.
let connection

// This function finds (and updates) or creates a User entry.
// `profile` is the user data object from GitHub OAuth.
module.exports = (profile, callback) => {

  // Extract the GitHub user id (not the username, this is a unique string of digits).
  const userId = profile.id

  // Create the ShareDB connection if it doesn't exist.
  if (!connection) {
    connection = backend.connect()
  }

  // Fetch the ShareDB document for this User.
  const doc = connection.get(DB_USERS_COLLECTION, userId)
  doc.fetch((err) => {
    if (err) {
      return callback(err)
    }

    // Create the user document if if doesn't exist.
    if (doc.type === null) {
      return doc.create(profile, (err) => {
        if (err) {
          return callback(err)
        }
        callback(null, doc.data)
      })
    }

    callback(null, doc.data)
  })
}
