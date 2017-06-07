const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('view', '/view/:id')
routes.add('edit', '/edit/:id')
routes.add('profile', '/:username')
