export default (initImpl, tearDownImpl, isReady) => ({
  init: jest.fn(initImpl),
  tearDown: jest.fn(tearDownImpl),
  isReady: jest.fn(isReady)
})
