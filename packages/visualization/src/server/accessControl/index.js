const shareDbAccess = require('sharedb-access')
const { ALLOW_CREATE, ALLOW_READ, ALLOW_UPDATE, ALLOW_DELETE } = require('./rules')

module.exports = {
  applyAccessControlMiddleware: (backend) => {

    shareDbAccess(backend)

    ALLOW_CREATE.forEach(({collection, rule}) => backend.allowCreate(collection, rule))
    ALLOW_READ.forEach(({collection, rule}) => backend.allowRead(collection, rule))
    ALLOW_UPDATE.forEach(({collection, rule}) => backend.allowUpdate(collection, rule))
    ALLOW_DELETE.forEach(({collection, rule}) => backend.allowDelete(collection, rule))

  }
}
