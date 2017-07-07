const get = require('lodash/get')

// This module implements ShareDB middleware that adds the
// user who performed the op into the op middleware.
module.exports = (shareDB) => {

  // This middleware applies to all ops (changes).
  shareDB.use('apply', (request, done) => {

    // Unpack the ShareDB request object.
    const {
      op,
      agent: {
        session
      }
    } = request

    // Get the id of the currently logged in user from the session.
    const userId = get(session, 'passport.user.id')

    // If there is a user logged in, store the user id under op.m.u.
    // This is stored for analyzing user activity later on.
    if (userId) {
      op.m.u = userId
    }

    done()
  })
}
