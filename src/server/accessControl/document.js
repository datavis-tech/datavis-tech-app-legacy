function checkUserPermissionOnDocument (doc, user) {
  if (!doc.isPrivate) {
    return true
  }

  if (doc.owner === user.id) {
    return true
  }

  if (doc.collaborators && doc.collaborators.find(c => c.id === user.id)) {
    return true
  }

  return false
}

const allowCreate = async () => true

const allowRead = async (_, doc, __, {agent: {session: {passport: {user}}}}) => {
  return checkUserPermissionOnDocument(doc, user)
}

const allowDelete = async (_, doc, __, {agent: {session: {passport: {user}}}}) => {
  return checkUserPermissionOnDocument(doc, user)
}

const allowUpdate = async (_, doc, __, ___, ____, {agent: {session: {passport: {user}}}}) => {
  return checkUserPermissionOnDocument(doc, user)
}

module.exports = {
  allowCreate,
  allowRead,
  allowUpdate,
  allowDelete
}
