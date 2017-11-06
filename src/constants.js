const AUTH_PATH = '/auth'

module.exports = Object.freeze({
  // This module defines constants used across many modules.
  AUTH_PATH,
  AUTH_PATH_GITHUB: `${AUTH_PATH}/github`,
  AUTH_PATH_LOGOUT: `${AUTH_PATH}/logout`,
  AUTH_FAILURE_REDIRECT: `${AUTH_PATH}/failed`,
  AUTH_LOGOUT_REDIRECT: '/',

  // The collection containing documents.
  DB_DOCUMENTS_COLLECTION: 'documents',

  // The ShareDB Projection that excludes the content from documents,
  // so a listing of documents need not download full content for each.
  DB_DOCUMENTS_PROJECTION: 'documentsProjection',

  // The collection containing user records.
  DB_USERS_COLLECTION: 'users',

  // The collection containing feedback entries.
  DB_FEEDBACK_COLLECTION: 'feedback',

  // To limit the results by autocompleter
  AUTOCOMPLETER_LIMIT: 10
})
