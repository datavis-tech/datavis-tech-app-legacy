import connection from './connection'
import { DB_USERS_COLLECTION } from '../constants'

import _ from 'lodash'

// Find profile data by mathcing starting of username
const createUsersQuery = (mongoQuery, update) => {
  const query = connection.createFetchQuery(DB_USERS_COLLECTION, mongoQuery)
  const change = () => {
    if (query.results.length) {
      const results = _.map(query.results, ({data}) => {
        return {
          id: data.id,
          title: data.username,
          display: data.displayName
        }
      })
      update(results)
    } else {
      update([])
    }
  }
  query.on('ready', change)
  query.on('changed', change)
  return query
}

export default createUsersQuery
