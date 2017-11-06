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
