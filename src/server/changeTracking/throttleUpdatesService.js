const RedisSMQ = require('rsmq')
const curry = require('lodash/curry')
const { VISUALIZATION_UPDATED, DATASET_UPDATED } = require('./queues')
const { datasetsUpdatesBuffer, visualizationsUpdatesBuffer } = require('./buffers')
const { THROTTLE_PERIOD } = require('./constants')

const rsmq = new RedisSMQ({host: process.env.DVT_REDIS_HOST, port: process.env.DVT_REDIS_PORT})

const sendMessage = curry(
  (qname, documentId) => rsmq.sendMessage(
    {qname, message: JSON.stringify({documentId})},
    (err, resp) => resp ? console.log('Message sent. ID:', resp) : console.log(err)
  )
)

function throttleUpdatesService () {

  function loop () {

    Array.from(datasetsUpdatesBuffer).forEach(sendMessage(DATASET_UPDATED))
    Array.from(visualizationsUpdatesBuffer).forEach(sendMessage(VISUALIZATION_UPDATED))

    datasetsUpdatesBuffer.clear()
    visualizationsUpdatesBuffer.clear()

    setTimeout(loop, THROTTLE_PERIOD)
  }

  loop()
}

if (require.main === module) {
  throttleUpdatesService()
} else {
  module.exports = throttleUpdatesService
}
