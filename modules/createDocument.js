import connection from './shareDBConnection'
import uuidV4 from 'uuid/v4'
import { DB_DOCUMENTS_COLLECTION } from './constants'

const generateId = () => uuidV4().replace(/-/g, '')

export default ({ title, description, owner }) => {
  const id = generateId()
  const doc = connection.get(DB_DOCUMENTS_COLLECTION, id)

  doc.create({
    title,
    description,
    owner
    // files
  })

  return id
}
