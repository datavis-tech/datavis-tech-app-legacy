const createRequestHandler = require('./handleRequest')

module.exports = (expressApp, backend) => {
  const connection = backend.connect()
  expressApp.get('/vis/:id/export', createRequestHandler(connection))
}
