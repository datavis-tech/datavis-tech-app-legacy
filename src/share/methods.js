/**
 * This module exposes a set of methods for interacting with the database.
 */
import uuid from 'node-uuid'

// The collection name for storing documents.
export const DOCUMENTS = 'documents'

export const now = () => new Date().toISOString()

// This function should be invoked with a ShareDB connection.
export default (connection) => ({

  // Creates a new document in the ShareDB database.
  // Returns a Promise which gets resolved with the document ID,
  // or rejected with an error generated by ShareDB.
  createDocument: (owner, title, description='', content='') => {

    // Generate a random UUID as the document id.
    const id = uuid.v4()

    // The initial content of the document.
    const data = {
      owner, // The user id of the document owner.
      title, // A String, the human-readable title of the document.
      description, // A String, human-readable free text description.
      content, // A String, the content of the document.
      createdDate: now(), // The creation date as an ISO String.
      updatedDate: now(), // The 'last updated' date as an ISO String.
      views: 0 // The lifetime count of views
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

  // Subscribes to the document with the given id.
  // Returns a Promise that resolves to the ShareDB doc,
  // or is rejected with an error generated by ShareDB.
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

  // TODO unmountDocument
})
