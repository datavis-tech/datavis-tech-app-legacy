const AUTH_PATH = '/auth'
const AUTH_PATH_GITHUB = AUTH_PATH + '/github'
const AUTH_PATH_LOGOUT = AUTH_PATH + '/logout'
const AUTH_SUCCESS_REDIRECT = '/'
const AUTH_FAILURE_REDIRECT = AUTH_PATH + '/failed'
const AUTH_LOGOUT_REDIRECT = AUTH_SUCCESS_REDIRECT

// The collection containing documents.
const DB_DOCUMENTS_COLLECTION = 'documents'

// The ShareDB Projection that excludes the content from documents,
// so a listing of documents need not download full content for each.
const DB_DOCUMENTS_PROJECTION = 'documentsProjection'

// The collection containing user records.
const DB_USERS_COLLECTION = 'users'

module.exports = {
  AUTH_PATH,
  AUTH_PATH_GITHUB,
  AUTH_PATH_LOGOUT,
  AUTH_SUCCESS_REDIRECT,
  AUTH_FAILURE_REDIRECT,
  AUTH_LOGOUT_REDIRECT,
  DB_DOCUMENTS_COLLECTION,
  DB_USERS_COLLECTION
}
