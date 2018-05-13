import { observable } from 'mobx'

export default function Document (documentProperties) {
  return observable(documentProperties)
}
