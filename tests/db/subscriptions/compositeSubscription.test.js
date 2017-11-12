import CallbackTrigger from '../../utils/callbackTrigger'
import fakeSubscription from '../../utils/fakeSubscription'
import CompositeSubscription from '../../../src/db/subscriptions/compositeSubscription'

describe('composite subscription', () => {

  let sut
  let subscriptions
  let onUpdate
  let subscriptionAUpdateTrigger
  let subscriptionBUpdateTrigger

  let resultA
  let resultB

  beforeEach(() => {

    onUpdate = jest.fn()

    subscriptionAUpdateTrigger = new CallbackTrigger()
    subscriptionBUpdateTrigger = new CallbackTrigger()

    resultA = Symbol('resultA')
    resultB = Symbol('resultB')

    subscriptions = {
      A: fakeSubscription(({onUpdate}) => subscriptionAUpdateTrigger.set(onUpdate, null, resultA)),
      B: fakeSubscription(({onUpdate}) => subscriptionBUpdateTrigger.set(onUpdate, null, resultB))
    }

    sut = CompositeSubscription(subscriptions)

    sut.init({onUpdate})
  })

  it('should init all passed subscriptions', () => {
    expect(subscriptions.A.init).toHaveBeenCalled()
    expect(subscriptions.B.init).toHaveBeenCalled()
  })

  it('should call update callback if subscription A receive update', () => {
    subscriptionAUpdateTrigger.trigger()
    expect(onUpdate).toHaveBeenCalledWith({A: resultA, B: undefined})
  })

  it('should call update callback if subscription B receive update', () => {
    subscriptionBUpdateTrigger.trigger()
    expect(onUpdate).toHaveBeenCalledWith({A: undefined, B: resultB})
  })

  it('should call update callback with both updates', () => {
    subscriptionAUpdateTrigger.trigger()
    subscriptionBUpdateTrigger.trigger()
    expect(onUpdate).toHaveBeenCalledWith({A: resultA, B: resultB})
  })

  it('should tear down all passed subscriptions', () => {
    sut.tearDown()
    expect(subscriptions.A.tearDown).toHaveBeenCalled()
    expect(subscriptions.B.tearDown).toHaveBeenCalled()
  })

})
