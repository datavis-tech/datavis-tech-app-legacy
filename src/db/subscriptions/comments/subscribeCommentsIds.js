import { DB_COMMENTS_COLLECTION } from '../../../constants'
import connection from '../../connection'

// TODO test
export default ({ relatedDocument }, { onUpdate, onError }) => (
  connection.createSubscribeQuery(
    DB_COMMENTS_COLLECTION,
    { relatedDocument },
    {},
    (err, comments) => err ? onError(err) : onUpdate(comments.map(c => c.id))
  )
)
