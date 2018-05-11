module.exports = (socket, repository, callbackRegisty) => ({ id }) => {
  socket.join(id)
  repository.subscribe(id, callbackRegisty.get(id))
}
