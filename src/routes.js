const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('consulting', '/consulting')
routes.add('associates', '/associates')

routes.add('create', '/create')
routes.add('feedback', '/feedback')
routes.add('feedback-thanks', '/feedback-thanks')
routes.add('data', '/data/:id', 'views/data')
routes.add('vis', '/vis/:id', 'views/vis')
routes.add('edit', '/edit/:id')
routes.add('profile', '/:username')
