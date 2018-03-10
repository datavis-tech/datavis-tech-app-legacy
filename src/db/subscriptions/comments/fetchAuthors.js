import { DB_USERS_COLLECTION } from '../../../constants'
import connection from '../../connection'

// TODO test
export default ({ids}) => {
  new Promise((resolve, reject) => (
    connection.createFetchQuery(
      DB_USERS_COLLECTION,
      {_id: {$in: ids}},
      {},
      (err, authors) => err ? reject(err) : resolve(authors)
    )
  ))
}
