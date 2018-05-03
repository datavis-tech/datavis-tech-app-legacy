module.exports = (io, room) => diff => io.to(room).emit('change', diff)
