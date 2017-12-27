import * as serializers from '../../src/db/serializers'
import fakeDoc from '../utils/fakeDoc'

describe('serializers', () => {

  let sut
  let result

  describe('document serializer', () => {

    let doc

    beforeEach(() => {
      sut = serializers.serializeDocument
      doc = fakeDoc({data: {collaborators: [{id: 1}, {id: 2}], references: [{id: 3}, {id: 4}]}})
      result = sut(doc)
    })

    it('should serialize document', () => {
      expect(result).toMatchObject({
        id: doc.id,
        type: doc.data.type,
        title: doc.data.title,
        description: doc.data.description,
        content: doc.data.content,
        isPrivate: doc.data.isPrivate,
        references: doc.data.references,
        referencesIds: [3, 4],
        collaborators: doc.data.collaborators,
        collaboratorsIds: [1, 2],
        forkedFrom: doc.data.forkedFrom
      })
    })

  })

})
