const RedisSMQ = require('rsmq')
const puppeteer = require('puppeteer')
const { backend } = require('../shareDB')
const createDocumentContentSandbox = require('../documentContentSandbox')
const onVisUpdatedHandler = require('./onVisUpdatedHandler')
const { QUEUES } = require('../changeTracking')

// TODO test

const rsmq = new RedisSMQ({host: process.env.DVT_REDIS_HOST, port: process.env.DVT_REDIS_PORT})
const sandbox = createDocumentContentSandbox(backend)

function QueryResponsePromise () {
  return new Promise((resolve, reject) => {
    rsmq.popMessage({qname: QUEUES.VISUALIZATION_UPDATED}, (err, resp) => err ? reject(err) : resolve(resp))
  })
}

const thumbnailGenerationService = async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']})
  const handleVisUpdate = onVisUpdatedHandler(backend.connect(), browser, sandbox)

  async function loop () {
    try {
      const response = await QueryResponsePromise()
      await handleVisUpdate(response)
    } catch (err) {
      console.log(err)
    }

    setTimeout(loop, 1000)
  }

  loop()
}

if (require.main === module) {
  thumbnailGenerationService()
} else {
  module.exports = thumbnailGenerationService
}
