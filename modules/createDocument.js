import connection from './shareDBConnection'
import uuidV4 from 'uuid/v4'
//import { DB_DOCUMENT, DB_EPHEMERAL } from './constants'

const generateId = () => uuidV4().replace(/-/g, '')

export default () => {
  const id = generateId()
  const doc = connection.get('examples', 'textarea')
  return id
}
