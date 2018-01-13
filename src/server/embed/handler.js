const { getHrefForRoute } = require('../../routesUtils')
const createDocumentContentSandbox = require('../documentContentSandbox')

module.exports = (backend) => {

  const documentContentSandbox = createDocumentContentSandbox(backend)

  return async (req, res) => {

    const html = await documentContentSandbox({
      id: req.params.id,
      href: getHrefForRoute('vis', {id: req.params.id}),
      origin: req.query.origin
    })

    res.send(html)
  }
}
