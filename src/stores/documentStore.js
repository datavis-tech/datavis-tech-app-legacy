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

    addRecent: action(addRecent),
    applyDiffToDocument: action(applyDiffToDocument)
  }

  function addRecent (documentProperties) {
    const dedupedDocumentProperties = documentProperties.filter(
      dp => !findDocumentById(dp.id)
    )
    rememberRecentIds(dedupedDocumentProperties.map(dp => dp.id))
    add(dedupedDocumentProperties)
  }

  // TODO test
  function applyDiffToDocument (id, diff) {
    const document = documents.find(d => d.id === id)
    if (document) {
      type.apply(document, diff)
      lastUpdateTimestamp.set(Date.now())
    }
  }

  function add (documentProperties) {
    documentProperties.map(Document).forEach(d => documents.push(d))

    lastUpdateTimestamp.set(Date.now())
  }

  function rememberRecentIds (ids) {
    recentIds.push(...ids)
  }

  function findDocumentById (id) {
    return documents.find(d => d.id === id)
  }
}
