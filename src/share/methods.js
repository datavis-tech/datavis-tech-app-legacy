import uuid from 'node-uuid'

export default (connection) => ({
  createDocument: (title, description) => {
    const id = uuid.v4()
    const doc = connection.get('documents', id)
    const initialContent = { title, description}

    console.log("creating document")
    doc.create(initialContent, () => {
      console.log("created document")
      console.log(doc)
    })
  }
})
