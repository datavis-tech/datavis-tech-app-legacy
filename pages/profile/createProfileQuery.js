import connection from '../../modules/shareDBConnection'
import { DB_USERS_COLLECTION } from '../../modules/constants'

// Find profile data by username.
// Draws from https://github.com/share/sharedb/blob/master/examples/leaderboard/client/Leaderboard.jsx
//
//  * `username` is used to look up the profile data.
//  * `update` is a function that can be invoked multiple times.
//    * If successful, `update` is passed the profile data.
//      * If profile data is updated, `update` will be called again with fresh data.
//    * If unsuccessful, `update` is passed `null`, meaning no matching user found.
//
// Returns the query object so it can be closed on component unmount.
const createProfileQuery = (username, update) => {
  const mongoQuery = { username }
  const query = connection.createSubscribeQuery(DB_USERS_COLLECTION, mongoQuery)
  const change = () => {
    if (query.results.length === 1) {
      update(query.results[0].data)
    } else {
      update(null)
    }
  }
  query.on('ready', change)
  query.on('changed', change)
  return query
}

export default createProfileQuery
