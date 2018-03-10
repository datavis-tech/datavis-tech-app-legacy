// ToDo convert to closure in order to avoid __* names
export default class CallbackTrigger {
  set (callback, ctx, ...params) {
    this.__callback = callback.bind(ctx, ...params)
  }

  trigger () {
    if (this.__callback) {
      this.__callback()
    }
  }
}

export function controlledCallback (impl, ctx, ...params) {
  function callback () {
    return impl.apply(ctx, ...params)
  }

  callback.trigger = () => callback.apply(null)

  return callback
}
