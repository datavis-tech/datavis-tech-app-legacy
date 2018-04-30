import { observable, computed, action } from 'mobx'
import Document from './document'

function DocumentStore () {
  const documents = observable.array([])
  const recentIds = observable.array([])

  const recent = computed(() => recentIds.map(findDocumentById))

  return {
    get recent () {
      return recent.get()
    },

    addRecent: action(addRecent)
  }

  function addRecent (documentProperties) {
    const dedupedDocumentProperties = documentProperties.filter(
      dp => !findDocumentById(dp.id)
    )

    documents.push(...dedupedDocumentProperties.map(Document))
    recentIds.push(...dedupedDocumentProperties.map(dp => dp.id))
  }

  function findDocumentById (id) {
    return documents.find(d => d.id === id)
  }
}

export default DocumentStore()
