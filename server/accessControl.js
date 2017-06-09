const get = require('lodash/get')

// This module implements access control rules at the ShareDB layer.
// This prevents, for example, editing documents you don't own.

// Middleware usage inspired by
// https://github.com/dmapper/sharedb-access/blob/master/lib/index.js

module.exports = (shareDB) => {

  // Expose the session to downstram middleware as agent.session.
  shareDB.use('connect', (request, done) => {
    request.agent.session = request.req.session
    done()
  })

  // This middleware applies to all ops (changes).
  shareDB.use('apply', (request, done) => {

    // Unpack the ShareDB request object.
    const {
      op,
      agent: { session },
      snapshot
    } = request

    // Get the id of the currently logged in user from the session.
    const userId = get(session, 'passport.user.id')

    // Get the owner id.
    const owner = (
      op.create
      ? (op.create.data || {}) // Handle the case of a creation op.
      : snapshot.data // Handle ops on an existing document.
    ).owner

    // Access control rules:

    // For all ops, owner must be the logged in user.
    if(!userId || (owner !== userId)) {
      return done("Error: Document owner must match currently logged in user.")
    }

    done()
  })
}
