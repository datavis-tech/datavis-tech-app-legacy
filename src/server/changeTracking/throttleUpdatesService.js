const RedisSMQ = require('rsmq')
const curry = require('lodash/curry')
const { VISUALIZATION_UPDATED, REFERENCE_UPDATED } = require('./queues')
const { referencesUpdatesBuffer, visualizationsUpdatesBuffer } = require('./buffers')
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

    Array.from(referencesUpdatesBuffer).forEach(sendMessage(REFERENCE_UPDATED))
    Array.from(visualizationsUpdatesBuffer).forEach(sendMessage(VISUALIZATION_UPDATED))

    referencesUpdatesBuffer.clear()
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
