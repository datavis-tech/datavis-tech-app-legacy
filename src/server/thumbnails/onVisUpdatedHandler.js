const getDocument = require('../documentContentSandbox/getDocument')
const updateThumnail = require('./updateThumbnail')

module.exports = (connection, browser, sandbox) => async (resp) => {
  if (resp && resp.message) {
    const message = JSON.parse(resp.message)
    const shareDbDoc = await getDocument(connection, message.documentId)
    updateThumnail(browser, sandbox, shareDbDoc)
  }
}
