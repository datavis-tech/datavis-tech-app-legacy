import { observable, computed, action, observe, toJS } from 'mobx'
import { type } from 'ot-json0'
import jsondiff from 'json0-ot-diff'
import diffMatchPatch from 'diff-match-patch'
import Document from './document'

module.exports = function DocumentStore (observers) {
  const documents = observable.array([])
  // TODO test observability
  // allow to react on document changes for things like subscription to websockets on docs changes
  observe(documents, change => {
    observers.onDocumentAdded(change.added)
    observers.onDocumentRemoved(change.removed)
  })

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

    applyDiffToDocument: action(applyDiffToDocument),

    submitTitleChangeToDocument,
    submitDescriptionChangeToDocument,
    submitContentChangeToDocument,

    submitCollaboratorAddToDocument,
    submitCollaboratorRemoveToDocument,

    submitReferenceAddToDocument,
    submitReferenceRemoveToDocument,

    submitDocumentDelete
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

  function submitTitleChangeToDocument (aDocument, title) {
    const modifiedDocument = Object.assign(toJS(aDocument), { title })
    computeDiff(aDocument, modifiedDocument)
  }

  function submitDescriptionChangeToDocument (aDocument, description) {
    const modifiedDocument = Object.assign(toJS(aDocument), {
      description
    })
    computeDiff(aDocument, modifiedDocument)
  }

  function submitContentChangeToDocument (aDocument, content) {
    const modifiedDocument = Object.assign(toJS(aDocument), { content })
    computeDiff(aDocument, modifiedDocument)
  }

  function submitCollaboratorAddToDocument (aDocument, profileId) {
    const modifiedDocument = toJS(aDocument)
    modifiedDocument.collaborators.push(profileId)
    computeDiff(aDocument, modifiedDocument)
  }

  function submitCollaboratorRemoveToDocument (aDocument, userId) {
    const modifiedDocument = toJS(aDocument)
    modifiedDocument.collaborators = modifiedDocument.collaborators.filter(
      c => c !== userId
    )
    computeDiff(aDocument, modifiedDocument)
  }

  function submitReferenceAddToDocument (aDocument, filename, referenceId) {
    const modifiedDocument = toJS(aDocument)
    modifiedDocument.references.push({
      filename,
      referenceId
    })
    computeDiff(aDocument, modifiedDocument)
  }

  function submitReferenceRemoveToDocument (aDocument, referenceId) {
    const modifiedDocument = toJS(aDocument)
    modifiedDocument.references = modifiedDocument.references.filter(
      r => r.referenceId !== referenceId
    )
    computeDiff(aDocument, modifiedDocument)
  }

  async function submitDocumentDelete (document) {
    // should throw an
  }

  function computeDiff (oldDocument, newDocument) {
    const diff = jsondiff(oldDocument, newDocument, diffMatchPatch)
    observers.onDocumentDiff(oldDocument.id, diff)
  }
}
