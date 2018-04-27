const express = require('express')
const router = express.Router()
const { DocumentRepository } = require('../repositories')
const recentDocuments = require('./recentDocumentsHandler')

module.exports = connection => {

  const repository = DocumentRepository(connection)

  router.get('/', (req, res) => {
    res.sendStatus(501)
  })

  router.get('/recent', recentDocuments(repository))

  return router
}
