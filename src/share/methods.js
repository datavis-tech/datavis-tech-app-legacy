import uuid from 'node-uuid'

// The collection name for storing documents.
export const DOCUMENTS = 'documents'

export const now = () => new Date().toISOString()

export default (connection) => ({

  createDocument: (title, description="", content="") => {

    const id = uuid.v4()
    const data = {
      title,
      description,
      content,
      createdDate: now(),
      updatedDate: now(),
      views: 0
    }

    const doc = connection.get(DOCUMENTS, id)

    return new Promise((resolve, reject) => {
      doc.create(data, (error) => {
        if(error){
          reject(error)
        } else {
          resolve(id)
        }
      })
    })
  },

  mountDocument: (id) => {
    const doc = connection.get(DOCUMENTS, id)
    return new Promise((resolve, reject) => {
      doc.subscribe((error) => {
        if(error){
          reject(error)
        } else {
          resolve(doc)
        }
      })
    })
  }
})
