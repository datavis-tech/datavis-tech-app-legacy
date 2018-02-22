// This utility creates a fake ShareDB "doc" object that can be used
// in any tests where a doc object is required.
export default ({
  id,
  data: {type, title, description, content, owner, references, collaborators, forkedFrom, isPrivate, thumbnail}} = {data: {}}
) => {
  const _id = id || String(Math.random())
  return {
    id: _id,
    data: {
      id: _id,
      type: type || String(Math.random()),
      title: title || String(Math.random()),
      description: description || String(Math.random()),
      content: content || String(Math.random()),
      owner: owner || Symbol('owner'),
      references: references || [],
      collaborators: collaborators || [],
      forkedFrom: forkedFrom || String(Math.random()),
      isPrivate: isPrivate || false,
      thumbnail: thumbnail || String(Math.random())
    },
    subscribe: jest.fn(),
    on: jest.fn(),
    destroy: jest.fn(),
    removeListener: jest.fn(),
    submitOp: jest.fn()
  }
}
