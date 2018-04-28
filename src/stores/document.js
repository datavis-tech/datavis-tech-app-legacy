import { observable } from 'mobx'

export default function Document (documentProperties) {
  const title = observable.box(documentProperties.title)
  const description = observable.box(documentProperties.description)
  const content = observable.box(documentProperties.content)
  const references = observable.box(documentProperties.references)
  const isPrivate = observable.box(documentProperties.isPrivate)

  return {
    get id () {
      return documentProperties.id
    },

    get type () {
      return documentProperties.type
    },

    get title () {
      return title.get()
    },
    set title (newTitle) {
      title.set(newTitle)
    },

    get description () {
      return description.get()
    },
    set description (newDescription) {
      description.set(newDescription)
    },

    get content () {
      return content.get()
    },
    set content (newContent) {
      content.set(newContent)
    },

    get references () {
      return references.get()
    },
    set references (newReferences) {
      references.set(newReferences)
    },
    get isPrivate () {
      return isPrivate.get()
    },
    set isPrivate (newIsPrivate) {
      isPrivate.set(newIsPrivate)
    }

  }

}
