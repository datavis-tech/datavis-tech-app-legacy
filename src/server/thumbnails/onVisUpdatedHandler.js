const getDocument = require('../documentContentSandbox/getDocument')
const updateThumnail = require('./updateThumbnail')

module.exports = (connection, browser, sandbox) => async (resp) => {

  if (!resp || !resp.message) return

  const parsedMessage = JSON.parse(resp.message)
  const shareDbDoc = await getDocument(connection, parsedMessage.documentId)

  if (!shareDbDoc) return

  updateThumnail(browser, sandbox, shareDbDoc)
}
