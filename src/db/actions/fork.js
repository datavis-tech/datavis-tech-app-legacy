import { createDocument } from './createDocument'
import {
  title,
  description,
  content,
  references
} from '../accessors'

export const fork = (doc, owner) => {
  return createDocument({
    title: `Fork of ${title(doc)}`,
    description: description(doc),
    owner,
    content: content(doc),
    references: references(doc)
  })
}
