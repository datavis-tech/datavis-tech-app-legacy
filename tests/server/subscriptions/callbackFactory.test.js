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
  let io
  let room
  let emit

  beforeEach(() => {
    emit = Symbol('emit')
    emitter.mockReturnValue(emit)

    io = Symbol('io')
    room = Symbol('room')
    createCallbackFactory(io)(room)
  })

  it('should create emitter', () => {
    expect(emitter).toHaveBeenCalledWith(io, room)
  })

  it('should create a flow that consist of error handlind, diff computing and emiting', () => {
    expect(flow).toHaveBeenCalledWith(rejectOnError, computeOTDiff, emit)
  })
})
