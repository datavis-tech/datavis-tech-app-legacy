const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('consulting', '/consulting')
routes.add('associates', '/associates')

routes.add('beta', '/beta')
routes.add('create', '/create')
routes.add('vis', '/vis/:id')
routes.add('edit', '/edit/:id')
routes.add('profile', '/:username')
