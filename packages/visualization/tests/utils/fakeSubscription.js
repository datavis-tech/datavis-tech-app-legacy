export default (initImpl, tearDownImpl) => ({
  init: jest.fn(initImpl),
  tearDown: jest.fn(tearDownImpl)
})
