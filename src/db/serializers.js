const find = require('lodash/find')
const accessors = require('./accessors')

const serializeDocument = (document) => (
  {
    id: accessors.id(document),
    type: accessors.type(document),
    title: accessors.title(document),
    description: accessors.description(document),
    content: accessors.content(document),
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

const serializeComment = (comment) => (
  {
    id: comment.id,
    author: comment.data.author,
    relatedDocument: comment.data.relatedDocument,
    text: comment.data.text
  }
)

const serializeComments = (comments, authors) => {

  console.log(comments, authors)

  return comments.map(comment => {
    const author = find(authors, {id: comment.author})
    return {
      ...serializeComment(comment),
      displayName: author ? author.data.displayName : '---',
      avatarUrl: author ? author.data._json.avatar_url : null
    }
  })
}

module.exports = {
  serializeDocument,
  serializeComment,
  serializeComments
}
