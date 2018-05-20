const express = require('express')
const router = express.Router()
const { DocumentRepository } = require('../repositories')
const recentDocuments = require('./recentDocumentsHandler')
const document = requrie('./document')
const references = require('./references')

module.exports = connection => {

  const repository = DocumentRepository(connection)

  router.get('/', (req, res) => {
    res.sendStatus(501)
  })

  router.get('/recent', recentDocuments(repository))
  router.get('/:id', document(repository))
  router.get('/:id/references', references(repository))

  return router
}
