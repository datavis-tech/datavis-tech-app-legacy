const { set } = require('./primitives')

// TODO test
module.exports = (shareDBDoc, thumbnail) => (
  set({shareDBDoc, property: 'thumbnail', item: thumbnail})
)
