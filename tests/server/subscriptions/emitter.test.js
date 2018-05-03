import emitter from '../../../src/server/subscriptions/emitter'

describe('emmiter', () => {
  let sut

  let io
  let room
  let emit

  let diff

  beforeEach(() => {
    room = String(Math.random())
    emit = jest.fn()
    io = {
      to: jest.fn(() => ({ emit }))
    }

    sut = emitter(io, room)
    diff = Symbol('diff')
    sut(diff)
  })

  it('should emit a diff to a room', () => {
    expect(io.to).toHaveBeenCalledWith(room)
    expect(emit).toHaveBeenCalledWith('change', diff)
  })
})
