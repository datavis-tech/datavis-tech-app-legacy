const routes = require('./routes')

// TODO: move it to ENV variable
const domain = 'https://datavis.tech'

function getHrefForRoute (route, params) {

  if (route === 'embed') {
    return `${domain}${routes.findByName('vis').getAs(params)}/embed`
  }

  return `${domain}${routes.findByName(route).getAs(params)}`
}

module.exports = {
  getHrefForRoute
}
