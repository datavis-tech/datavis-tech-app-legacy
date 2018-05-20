//TODO test
module.exports = repository => {
    return async (req, res) => {
        res.json(await repository.get(req.params.id))
    }
}
