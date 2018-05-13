import emitter from '../../../src/server/subscriptions/emitter'

describe('emmiter', () => {
  let sut

  let socket
  let id

  let diff

  beforeEach(() => {
    id = String(Math.random())
    socket = {
      emit: jest.fn()
    }

    sut = emitter(socket, id)
    diff = Symbol('diff')
    sut(diff)
  })

  it('should emit a diff to a room', () => {
    expect(socket.emit).toHaveBeenCalledWith('change', id, diff)
  })
})
