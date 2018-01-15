const RedisSMQ = require('rsmq')
const { backend } = require('../shareDB')
const { VISUALIZATION_UPDATED, DATASET_UPDATED } = require('./queues')
const getReferencedByDocuments = require('./getReferencedByDocuments')

const rsmq = new RedisSMQ({host: process.env.DVT_REDIS_HOST, port: process.env.DVT_REDIS_PORT})
const connection = backend.connect()

// TODO refactor and test
const updateVisOnReferenceChangeService = async () => {
  function loop () {
    rsmq.popMessage({qname: DATASET_UPDATED}, async (err, resp) => {

      if (err) {
        console.log(err)
      }

      if (resp && resp.message) {
        const message = JSON.parse(resp.message)
        const documents = await getReferencedByDocuments(connection, message.documentId)

        documents.forEach(document => {

          console.log('REFERENCE UPDATED', message, document.id)

          const visUpdatedMessage = {documentId: document.id}

          rsmq.sendMessage({qname: VISUALIZATION_UPDATED, message: JSON.stringify(visUpdatedMessage)}, (err, resp) => (
            resp
              ? console.log('Message sent. ID:', resp)
              : console.log(err)
          ))

        })
      }
    })
    setTimeout(loop, 1000)
  }

  loop()
}

if (require.main === module) {
  updateVisOnReferenceChangeService()
} else {
  module.exports = updateVisOnReferenceChangeService
}
