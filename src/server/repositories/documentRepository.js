const { DB_DOCUMENTS_COLLECTION } = require('../../constants')
const { serializeDocument } = require('../../db/serializers')

module.exports = function DocumentRepository(connection) {
    const recentDocumentsQuery = {
        $or: [
            { type: 'vis', viewCount: { $gte: 20 } },
            { type: 'data', viewCount: { $gte: 3 } }
        ],
        $sort: { viewCount: -1 },
        isPrivate: { $ne: true }
    }

    return {
        getRecentDocuments
    }

    async function getRecentDocuments() {
        return new Promise((resolve, reject) =>
            connection.createFetchQuery(
                DB_DOCUMENTS_COLLECTION,
                recentDocumentsQuery,
                {},
                (err, documents) => err ? reject({ reason: err.message }) : resolve(documents.map(serializeDocument))
            )
        )
    }
}
