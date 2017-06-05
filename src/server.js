// The main entry point for the server.
// Draws from https://github.com/zeit/next.js/blob/v3-beta/examples/with-next-routes/server.js

const { createServer } = require('http')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app
  .prepare()
  .then(() => {
    createServer(handler)
      .listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
      })
  })
