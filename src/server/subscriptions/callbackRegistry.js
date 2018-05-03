module.exports = callbackFactory => {
  const callbacks = {}

  return {
    get
  }

  function get (id) {
    if (!callbacks[id]) {
      callbacks[id] = callbackFactory(id)
    }

    return callbacks[id]
  }
}
