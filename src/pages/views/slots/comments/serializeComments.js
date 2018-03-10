import { serializeComments } from '../../../../db/serializers'

export default data => {
  if (data) {
    return serializeComments(data.comments, data.authors)
  }
  return []
}
