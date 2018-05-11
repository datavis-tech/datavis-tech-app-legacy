const { DocumentRepository } = require('../repositories')
const subscribe = require('./subscribe')
const unsubscribe = require('./unsubscribe')
const CallbackRegistry = require('./callbackRegistry')
const createCallbackFactory = require('./callbackFactory')

module.exports = (connection) => {

  return socket => {

    const repository = DocumentRepository(connection)
    const callbackFactory = createCallbackFactory(socket)
    const callbackRegistry = CallbackRegistry(callbackFactory)

    socket.on('subscribe', subscribe(socket, repository, callbackRegistry))
    socket.on('unsubscribe', unsubscribe(socket, repository, callbackRegistry))

    // TODO test
    socket.on('disconnect', () => callbackRegistry.getAll().forEach(repository.unsubscribe))
  }

}
