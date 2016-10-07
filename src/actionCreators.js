import connection from './connection'
import uuid from 'node-uuid'

export const collection = 'documents'

export const createDocument = (title, description) => {
  const initialValue = { title, description }
  const id = uuid.v4()
  const doc = connection.get(collection, id)
  doc.create(initialValue, (err) => {
    if(err){
      //reject(err)
    } else {
      doc.whenNothingPending(() => {
        console.log("Created document!" + id)
      })
    }
  })
}
