const profileAclRules = require('./profile')
const documentAclRules = require('./document')

const { DB_USERS_COLLECTION, DB_DOCUMENTS_COLLECTION, DB_COMMENTS_COLLECTION } = require('../../constants')

const ALLOW_CREATE = [
  {collection: DB_USERS_COLLECTION, rule: profileAclRules.allowCreate},
  {collection: DB_DOCUMENTS_COLLECTION, rule: documentAclRules.allowCreate},
  {collection: DB_COMMENTS_COLLECTION, rule: () => true}
]

const ALLOW_READ = [
  {collection: DB_USERS_COLLECTION, rule: profileAclRules.allowRead},
  {collection: DB_DOCUMENTS_COLLECTION, rule: documentAclRules.allowRead},
  {collection: DB_COMMENTS_COLLECTION, rule: () => true}
]

const ALLOW_UPDATE = [
  {collection: DB_USERS_COLLECTION, rule: profileAclRules.allowUpdate},
  {collection: DB_DOCUMENTS_COLLECTION, rule: documentAclRules.allowUpdate}
]

const ALLOW_DELETE = [
  {collection: DB_USERS_COLLECTION, rule: profileAclRules.allowDelete},
  {collection: DB_DOCUMENTS_COLLECTION, rule: documentAclRules.allowDelete}
]

module.exports = {
  ALLOW_CREATE,
  ALLOW_READ,
  ALLOW_UPDATE,
  ALLOW_DELETE
}
