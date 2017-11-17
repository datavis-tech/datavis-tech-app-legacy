import { createDocument } from './createDocument'
import {
  title,
  description
} from '../accessors'

export const fork = (doc, owner) => {
  return createDocument({
    title: title(doc),
    description: description(doc),
    owner
  })
}
