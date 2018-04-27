module.exports = repository => {
  return async (req, res) => {
    res.json(await repository.getRecentDocuments())
  }
}
