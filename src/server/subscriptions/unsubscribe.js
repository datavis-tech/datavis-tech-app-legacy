module.exports = (socket, repository, callbackRegisty) => ({ id }) => {
  socket.leave(id)
  repository.unsubscribe(callbackRegisty.get(id))
}
