import uuid from 'node-uuid'

// The collection name for storing documents.
export const DOCUMENTS = 'documents'

export default (connection) => ({

  createDocument: (title, description) => {
    const initialContent = { title, description }
    const id = uuid.v4()
    const doc = connection.get(DOCUMENTS, id)
    return new Promise((resolve, reject) => {
      doc.create(initialContent, (error) => {
        if(error){
          reject(error)
        } else {
          resolve(id)
        }
      })
    })
  },

  getDocument: (id) => {
    return connection.get(DOCUMENTS, id)
  }
})
