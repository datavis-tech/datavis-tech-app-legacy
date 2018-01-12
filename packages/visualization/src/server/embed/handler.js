const createSandbox = require('dvt-sandbox')
const { getHrefForRoute } = require('../../routesUtils')

module.exports = (backend) => {

  const sandbox = createSandbox(backend)

  return async (req, res) => {

    const html = await sandbox({
      id: request.params.id,
      href: getHrefForRoute('vis', {id: req.params.id}),
      origin: req.query.origin
    })

    res.send(html)
  }
}
