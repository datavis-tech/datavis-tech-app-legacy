const get = require('./get')

module.exports = (expressApp, backend) => {
  const connection = backend.connect()
  get(expressApp, connection)
}
