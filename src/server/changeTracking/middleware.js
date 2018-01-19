const RedisSMQ = require('rsmq')
const isContentOp = require('../../db/actions/isContentOp')
const QUEUES = require('./queues')

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
    if (isContentOp(op.op)) {
      const qname = snapshot.data.type === 'vis' ? QUEUES.VISUALIZATION_UPDATED : QUEUES.DATASET_UPDATED
      const message = JSON.stringify({documentId: snapshot.id})

      rsmq.sendMessage({qname, message}, (err, resp) => (
        resp
          ? console.log('Message sent. ID:', resp)
          : console.log(err)
      ))
      done()
    }

    done()
  })

}
