const flow = require('lodash/flow')
const rejectOnError = require('./rejectOnError')
const computeOTDiff = require('./computeOTDiff')
const emitter = require('./emitter')

module.exports = (io) => (room) => flow(rejectOnError, computeOTDiff, emitter(io, room))
