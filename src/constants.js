// This module defines constants used across many modules.

const AUTH_PATH = '/auth'
const AUTH_PATH_GITHUB = AUTH_PATH + '/github'
const AUTH_PATH_LOGOUT = AUTH_PATH + '/logout'
const AUTH_FAILURE_REDIRECT = AUTH_PATH + '/failed'
const AUTH_LOGOUT_REDIRECT = '/'

// The collection containing documents.
const DB_DOCUMENTS_COLLECTION = 'documents'

// The ShareDB Projection that excludes the content from documents,
// so a listing of documents need not download full content for each.
const DB_DOCUMENTS_PROJECTION = 'documentsProjection'

// The collection containing user records.
const DB_USERS_COLLECTION = 'users'

// The value of the 'type' field in documents
// when the document is a visualization.
const VIS_DOC_TYPE = 'vis'

// The value of the 'type' field in documents
// when the document is a dataset.
const DATA_DOC_TYPE = 'data'

// We're not using nice ES6 exports
// because this file needs to be 'require'd in Node.
module.exports = {
  AUTH_PATH,
  AUTH_PATH_GITHUB,
  AUTH_PATH_LOGOUT,
  AUTH_FAILURE_REDIRECT,
  AUTH_LOGOUT_REDIRECT,
  DB_DOCUMENTS_COLLECTION,
  DB_DOCUMENTS_PROJECTION,
  DB_USERS_COLLECTION,
  VIS_DOC_TYPE,
  DATA_DOC_TYPE
}
