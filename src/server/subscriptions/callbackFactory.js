const flow = require('lodash/flow')
const rejectOnError = require('./rejectOnError')
const computeOTDiff = require('./computeOTDiff')
const emitter = require('./emitter')

module.exports = socket => id => flow(rejectOnError, computeOTDiff, emitter(socket, id))
