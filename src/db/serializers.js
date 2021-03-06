const accessors = require('./accessors')

const serializeDocument = (document) => (
  {
    id: accessors.id(document),
    type: accessors.type(document),
    title: accessors.title(document),
    description: accessors.description(document),
    content: accessors.content(document),
    owner: accessors.owner(document),
    isPrivate: accessors.isPrivate(document),
    references: accessors.references(document),
    referencesIds: accessors.referenceIds(document),
    collaborators: accessors.collaborators(document),
    collaboratorsIds: accessors.collaboratorIds(document),
    forkedFrom: accessors.forkedFrom(document),
    thumbnail: accessors.thumbnail(document),
    viewCount: accessors.viewCount(document)
  }
)

module.exports = {
  serializeDocument
}
