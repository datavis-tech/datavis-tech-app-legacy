import { observable, computed, action } from 'mobx'
import { type } from 'ot-json0'
import Document from './document'

module.exports = function DocumentStore (externalObserver) {
  const documents = observable.array([])
  // allow to react on document changes for things like subscription to websockets on docs changes
  externalObserver(documents)

  const lastUpdateTimestamp = observable.box(0)

  const recentIds = observable.array([])
  const recent = computed(() => {
    // this observable allows to be updated without touching nested observable (documents properties in documents array)
    if (lastUpdateTimestamp.get() > 0) {
      return recentIds.map(findDocumentById)
    }

    return observable.array([])
  })

  return {
    get recent () {
      return recent.get()
    },

    getById,

    add: action(add),
    addRecent: action(addRecent),
    remove: action(remove),
    applyDiffToDocument: action(applyDiffToDocument)
  }

  function getById (id) {
    return documents.find(d => d.id === id)
  }

  function add (documentProperties) {
    pushDocuments(dedupe(documentProperties))
  }

  function addRecent (documentProperties) {
    const dedupedDocumentProperties = dedupe(documentProperties)
    pushRecentIds(dedupedDocumentProperties.map(dp => dp.id))
    pushDocuments(dedupedDocumentProperties)
  }

  // TODO test
  function applyDiffToDocument (id, diff) {
    const document = documents.find(d => d.id === id)
    if (document) {
      type.apply(document, diff)
      lastUpdateTimestamp.set(Date.now())
    }
  }

  function remove (document, callback) {
    if (documents.remove(document) && callback) {
      callback()
    }
  }

  function pushDocuments (documentProperties) {
    documentProperties.map(Document).forEach(d => documents.push(d))
    lastUpdateTimestamp.set(Date.now())
  }

  function pushRecentIds (ids) {
    recentIds.push(...ids)
  }

  function dedupe (documentProperties) {
    return documentProperties.filter(dp => !findDocumentById(dp.id))
  }

  function findDocumentById (id) {
    return documents.find(d => d.id === id)
  }
}
