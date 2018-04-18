const { serializeDocument } = require('../../db/serializers')
const getDocument = require('../documentContentSandbox/getDocument')

module.exports = (expresApp, connection) => (
  expresApp.get('/vis/:id/thumbnail.png', async ({ params: { id } }, res) => {
    const shareDBDoc = await getDocument(connection, id)
    const document = serializeDocument(shareDBDoc)
    const img = Buffer.from(document.thumbnail, 'base64')

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    })
    res.end(img)
  })
)
