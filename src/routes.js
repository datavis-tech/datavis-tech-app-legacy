const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

// Content pages.
routes.add('consulting', '/consulting')
routes.add('associates', '/associates')
routes.add('about', '/about')
routes.add('pricing', '/pricing')

// The Create page, for authenticated users to create documents.
routes.add('create', '/create/:type')

// The flow for providing feedback on the site/product/service.
routes.add('feedback', '/feedback')
routes.add('feedback-thanks', '/feedback-thanks')

// View Pages that present documents.
routes.add('data', '/data/:id', 'views/data')
routes.add('vis', '/vis/:id', 'views/vis')

// The Edit page, for authenticated users only.
routes.add('edit', '/edit/:id')

// The Settings page.
routes.add('settings', '/settings')

// The User Profile page.
routes.add('profile', '/:username')
