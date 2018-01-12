import { createDocument } from './createDocument'
import {
  id,
  title,
  description,
  content,
  references,
  type
} from '../accessors'

export const fork = (doc, owner) => {
  return createDocument({
    title: `Fork of ${title(doc)}`,
    description: description(doc),
    owner,
    content: content(doc),
    references: references(doc),
    type: type(doc),
    forkedFrom: id(doc)
  })
}
