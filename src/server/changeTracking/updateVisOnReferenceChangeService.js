const RedisSMQ = require('rsmq')
const { backend } = require('../shareDB')
const { DATASET_UPDATED } = require('./queues')
const { visualizationsUpdatesBuffer } = require('./buffers')
const { THROTTLE_PERIOD } = require('./constants')
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
        documents.forEach(({id}) => visualizationsUpdatesBuffer.add(id))
      }

    })
    setTimeout(loop, THROTTLE_PERIOD)
  }

  loop()
}

if (require.main === module) {
  updateVisOnReferenceChangeService()
} else {
  module.exports = updateVisOnReferenceChangeService
}
