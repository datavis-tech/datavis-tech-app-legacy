const setThumbnail = require('../../db/actions/setThumbnail')
const generateThumbnailBuffer = require('./generateThumbnailBuffer')

module.exports = async (browser, sandbox, shareDbDoc) => {
  console.log('updating thumbnail for ' + shareDbDoc.id)

  const html = await sandbox({id: shareDbDoc.id})
  const page = await browser.newPage()
  const thumbnailBuffer = await generateThumbnailBuffer(page, html)
  const thumbnail = thumbnailBuffer.toString('base64')
  setThumbnail(shareDbDoc, thumbnail)
}
