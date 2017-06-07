import connection from './shareDBConnection'
import uuidV4 from 'uuid/v4'

const generateId = () => uuidV4().replace(/-/g, '')

export default () => {
  const id = generateId()
  return id
}
