const { DocumentRepository } = require('../repositories')
const subscribe = require('./subscribe')
const unsubscribe = require('./unsubscribe')
const CallbackRegistry = require('./callbackRegistry')
const createCallbackFactory = require('./callbackFactory')

module.exports = (io, connection) => {

  return socket => {

    const repository = DocumentRepository(connection)
    const callbackFactory = createCallbackFactory(io)
    const callbackRegistry = CallbackRegistry(callbackFactory)

    socket.on('subscribe', subscribe(socket, repository, callbackRegistry))
    socket.on('unsubscribe', unsubscribe(socket, repository, callbackRegistry))
  }

}
