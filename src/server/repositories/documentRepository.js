const { DB_DOCUMENTS_COLLECTION } = require('../../constants')
const { serializeDocument } = require('../../db/serializers')

module.exports = function DocumentRepository (connection) {
  const recentDocumentsQuery = {
    $or: [
      { type: 'vis', viewCount: { $gte: 20 } },
      { type: 'data', viewCount: { $gte: 3 } }
    ],
    $sort: { viewCount: -1 },
    isPrivate: { $ne: true }
  }

  const subscribedDocuments = {}
  const sharedbListeners = {}

  return {
    getRecentDocuments,
    subscribe,
    unsubscribe
  }

  async function getRecentDocuments () {
    return new Promise((resolve, reject) =>
      connection.createFetchQuery(
        DB_DOCUMENTS_COLLECTION,
        recentDocumentsQuery,
        {},
        (err, documents) =>
          err
            ? reject(err)
            : resolve(documents.map(serializeDocument))
      )
    )
  }

  function subscribe (id, callback) {
    if (!subscribedDocuments[id]) {
      const document = connection.get(DB_DOCUMENTS_COLLECTION, id)
      let old = serializeDocument(document)

      subscribedDocuments[id] = {
        document: document,
        callbacks: [callback]
      }

      sharedbListeners[id] = () => {
        const sd = serializeDocument(document)
        subscribedDocuments[id].callbacks.forEach(cb =>
          cb(null, { old, new: sd })
        )
        old = sd
      }

      document.subscribe(() => document.on('op', sharedbListeners[id]))
    } else {
      subscribedDocuments[id].callbacks.push(callback)
    }
  }

  function unsubscribe (callback) {
    let id = findSubscribedDocumentIdByCallback(
      subscribedDocuments,
      callback
    )

    if (id) {
      subscribedDocuments[id].callbacks = filterUnsubscribedCallback(
        subscribedDocuments,
        id,
        callback
      )
    }

    if (id && subscribedDocuments[id].callbacks.length === 0) {
      subscribedDocuments[id].document.unsubscribe()
      subscribedDocuments[id].document.removeListener('op', sharedbListeners[id])

      delete subscribedDocuments[id]
      delete sharedbListeners[id]
    }
  }

  function findSubscribedDocumentIdByCallback (subscribedDocuments, callback) {
    for (let id of Object.keys(subscribedDocuments)) {
      if (subscribedDocuments[id].callbacks.indexOf(callback) !== -1) {
        return id
      }
    }
  }

  function filterUnsubscribedCallback (subscribedDocuments, id, callback) {
    return subscribedDocuments[id].callbacks.filter(cb => cb !== callback)
  }
}
