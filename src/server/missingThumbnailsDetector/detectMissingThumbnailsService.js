const RedisSMQ = require('rsmq')
const { backend } = require('../shareDB')
const { VISUALIZATION_UPDATED } = require('../changeTracking/queues')
const getDocumentsWithoutThumbnail = require('./getDocumentsWithoutThumbnail')

const rsmq = new RedisSMQ({host: process.env.DVT_REDIS_HOST, port: process.env.DVT_REDIS_PORT})
const connection = backend.connect()

// TODO test
const detectMissingThumbnails = async () => {
  const documentsWithoutThumbnails = await getDocumentsWithoutThumbnail(connection)

  documentsWithoutThumbnails.forEach(({id}) => {
    const visUpdatedMessage = {documentId: id}
    rsmq.sendMessage({qname: VISUALIZATION_UPDATED, message: JSON.stringify(visUpdatedMessage)}, (err, resp) => (
      resp
        ? console.log('Message sent. ID:', resp)
        : console.log(err)
    ))
  })

}

if (require.main === module) {
  detectMissingThumbnails()
} else {
  module.exports = detectMissingThumbnails
}
