//TODO test
module.exports = repository => {
    return async (req, res) => {
        res.json(await repository.getReferencesForDocument(req.params.id))
    }
}
