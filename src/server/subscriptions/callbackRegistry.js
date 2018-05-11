module.exports = callbackFactory => {
  const callbacks = {}

  return {
    get,
    getAll
  }

  function get (id) {
    if (!callbacks[id]) {
      callbacks[id] = callbackFactory(id)
    }

    return callbacks[id]
  }

  // TODO test
  function getAll () {
    return Object.keys(callbacks).map(id => callbacks[id])
  }
}
