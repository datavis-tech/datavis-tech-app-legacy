const { serializeDocument } = require('../db/serializers')
const getDocument = require('./documentContentSandbox/getDocument')

const URLS_SCHEMA = /^https?:\/\/datavis.tech\/vis\/(\w+)\/?$/

module.exports = (expressApp, backend) => {
  const connection = backend.connect()

  expressApp.get('/oembed', async ({ query: { url } }, res) => {
    const validationResults = url && url.match(URLS_SCHEMA)

    if (validationResults) {
      const id = validationResults[1]
      const shareDBDoc = await getDocument(connection, id)
      const document = serializeDocument(shareDBDoc)

      res.send({
        version: '1.0',
        type: 'rich',

        title: document.title,
        description: document.description,

        provider_name: 'Datavis Tech',
        provider_url: 'https://datavis.tech/',

        html: `<iframe src="https://datavis.tech/vis/${id}/embed" width="960" height="500" scrolling="no" style="border: solid 1px #ddd" ></iframe>`,
        width: 960,
        height: 500,

        thumbnail_url: `https://datavis.tech/vis/${id}/thumbnail.png`,
        thumbnail_width: 230,
        thumbnail_height: 120,

        cache_age: 3600
      })
    } else {
      res.sendStatus(404)
    }

  })
}
