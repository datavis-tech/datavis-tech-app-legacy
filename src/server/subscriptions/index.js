const subscriptions = require('./subscriptions')

// TODO test
module.exports = (io, backend) => {
  const connection = backend.connect()
  const nsp = io.of('/subscriptions')
  nsp.on('connection', subscriptions(io, connection))
}
