const documents = require('./documentsRouter')

// TODO test
module.exports = (expressApp, backend) => {
  const connection = backend.connect()
  expressApp.use('/rest/documents', documents(connection))
}
