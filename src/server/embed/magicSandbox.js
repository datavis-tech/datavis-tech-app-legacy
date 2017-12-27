const magicSandbox = require('magic-sandbox')

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
