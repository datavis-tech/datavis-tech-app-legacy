const { DB_USERS_COLLECTION } = require('../modules/constants')
const { backend } = require('./shareDB')

// A reusable ShareDB connection.
let connection

// This function finds (and updates) or creates a User entry.
// `profile` is the user data object from GitHub OAuth.
module.exports = (profile, callback) => {

  // Extract the GitHub user id (not the username, this is a unique string of digits).
  const userId = profile.id

  // Create the ShareDB connection if it doesn't exist.
  if(!connection){
    connection = backend.connect()
  }

  // Fetch the ShareDB document for this User.
  const doc = connection.get(DB_USERS_COLLECTION, userId)
  doc.fetch((err) => {
    if (err){
      return callback(err)
    }

    // Create the user document if if doesn't exist.
    if (doc.type === null) {
      return doc.create(profile, (err) => {
        if (err){
          return callback(err)
        }
        callback(null, profile)
      })
    }

    callback(null, profile)

    //// If the user document does exist,
    //// update it to contain the most recent profile data.
    //const op = {
    //  p: [],
    //  od: doc.data,
    //  oi: profile
    //}
    //doc.submitOp(op, (err) => {
    //  if (err){
    //    return callback(err)
    //  }
    //  callback(null, profile)
    //})
  })
}
