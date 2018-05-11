module.exports = (socket, id) => diff => socket.broadcast.emit('change', id, diff)
