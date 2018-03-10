export default({
  id,
  data: { author, relatedDocument, body }
} = {data: {}}) => {
  const _id = id || String(Math.random())
  return {
    id: _id,
    data: {
      id: _id,
      author: author || String(Math.random()),
      relatedDocument: relatedDocument || String(Math.random()),
      body: body || String(Math.random())
    },
    subscribe: jest.fn(),
    on: jest.fn(),
    destroy: jest.fn(),
    removeListener: jest.fn(),
    submitOp: jest.fn()
  }
}
