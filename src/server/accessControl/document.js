const get = require('lodash/get')

function checkUserPermissionOnDocument (doc, user) {
  if (!doc.isPrivate) {
    return true
  }

  if (doc.owner === user.id) {
    return true
  }

  if (doc.collaborators && user && doc.collaborators.find(c => c.id === user.id)) {
    return true
  }

  return false
}

const allowCreate = async () => true

// Accesses the user from the session,
// returns falsy if user is not authenticated.
const user = agent => get(agent, 'session.passport.user')

const allowRead = async (_, doc, __, {agent}) => {
  return checkUserPermissionOnDocument(doc, user(agent))
}

const allowDelete = async (_, doc, __, {agent}) => {
  return checkUserPermissionOnDocument(doc, user(agent))
}

const allowUpdate = async (_, doc, __, ___, ____, {agent}) => {
  return checkUserPermissionOnDocument(doc, user(agent))
}

module.exports = {
  allowCreate,
  allowRead,
  allowUpdate,
  allowDelete
}
