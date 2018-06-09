module.exports = (socket, id) => diff => socket.emit('change', id, diff)
