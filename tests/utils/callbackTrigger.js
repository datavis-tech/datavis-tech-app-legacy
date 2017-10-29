export default class CallbackTrigger {
  set(callback, ctx, ...params) {
    this.__callback = callback.bind(ctx, ...params)
  }

  trigger() {
    if(this.__callback) {
      this.__callback()
    }
  }
}