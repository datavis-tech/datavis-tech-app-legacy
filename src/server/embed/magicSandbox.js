const magicSandbox = require('magic-sandbox')

// This module wraps magic-sandbox such that it can execute
// in a Node.js environment without crashing.
//
// This module should be updated when
// https://github.com/curran/magic-sandbox/issues/6
// gets resolved.
module.exports = (content, files, origin) => {
  const oldWindow = global.window
  global.window = {
    location: {
      origin
    }
  }

  const html = magicSandbox(content, files)

  global.window = oldWindow

  return html
}
