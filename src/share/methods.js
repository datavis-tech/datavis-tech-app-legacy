import uuid from 'node-uuid'

export default (connection) => ({
  createDocument: (title, description) => {
    const initialContent = { title, description }
    const id = uuid.v4()
    const doc = connection.get('documents', id)
    return new Promise((resolve, reject) => {
      doc.create(initialContent, (error) => {
        if(error){
          reject(error)
        } else {
          resolve(id)
        }
      })
    })
  }
})
