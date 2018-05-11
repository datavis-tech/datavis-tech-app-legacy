jest.mock('lodash/flow')
import flow from 'lodash/flow'

jest.mock('../../../src/server/subscriptions/rejectOnError')
jest.mock('../../../src/server/subscriptions/computeOTDiff')
jest.mock('../../../src/server/subscriptions/emitter')

import rejectOnError from '../../../src/server/subscriptions/rejectOnError'
import computeOTDiff from '../../../src/server/subscriptions/computeOTDiff'
import emitter from '../../../src/server/subscriptions/emitter'

import createCallbackFactory from '../../../src/server/subscriptions/callbackFactory'

describe('callback factory', () => {
  let socket
  let id
  let emit

  beforeEach(() => {
    emit = Symbol('emit')
    emitter.mockReturnValue(emit)

    socket = Symbol('socket')
    id = Symbol('id')
    createCallbackFactory(socket)(id)
  })

  it('should create emitter', () => {
    expect(emitter).toHaveBeenCalledWith(socket, id)
  })

  it('should create a flow that consist of error handlind, diff computing and emiting', () => {
    expect(flow).toHaveBeenCalledWith(rejectOnError, computeOTDiff, emit)
  })
})
