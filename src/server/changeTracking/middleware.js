const RedisSMQ = require('rsmq')
const { VIS_DOC_TYPE } = require('../../constants')
const { isContentOp } = require('../../db/accessors')
const QUEUES = require('./queues')
const { referencesUpdatesBuffer, visualizationsUpdatesBuffer } = require('./buffers')

const rsmq = new RedisSMQ({host: process.env.DVT_REDIS_HOST, port: process.env.DVT_REDIS_PORT})

function toRSMQFormat (key) {
  return {qname: QUEUES[key]}
}

function createQueue (queue) {
  rsmq.createQueue(queue, (err, resp) => (
    resp === 1
      ? console.log('queue created')
      : console.log(err)
  ))
}

// TODO test
module.exports = (backend) => {

  Object
    .keys(QUEUES)
    .map(toRSMQFormat)
    .forEach(createQueue)

  backend.use('after submit', ({op, snapshot}, done) => {
    if (isContentOp(op)) {
      const buffer = snapshot.data.type === VIS_DOC_TYPE ? visualizationsUpdatesBuffer : referencesUpdatesBuffer
      buffer.add(snapshot.id)
    }

    done()

  })

}
