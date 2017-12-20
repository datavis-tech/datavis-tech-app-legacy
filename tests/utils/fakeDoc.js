// This utility creates a fake ShareDB "doc" object that can be used
// in any tests where a doc object is required.
export default ({id, data: {type, title, description, owner, references, collaborators, forkedFrom}} = {data: {}}) => ({
  id: id || String(Math.random()),
  data: {
    type: type || String(Math.random()),
    title: title || String(Math.random()),
    description: description || String(Math.random()),
    owner: owner || Symbol('owner'),
    references: references || [],
    collaborators: collaborators || [],
    forkedFrom: forkedFrom || String(Math.random())
  },
  subscribe: jest.fn(),
  on: jest.fn(),
  destroy: jest.fn(),
  removeListener: jest.fn(),
  submitOp: jest.fn()
})
