jest.mock('../../src/stores/document')
import Document from '../../src/stores/document'
import sut from '../../src/stores/documentStore'

describe('document store', () => {
  describe('add recent documents', () => {
    let documentProperties

    Document.mockImplementation(d => ({ id: d.id, observable: true }))

    documentProperties = [
      { id: String(Math.random()) },
      { id: String(Math.random()) },
      { id: String(Math.random()) }
    ]

    sut.addRecent(documentProperties)

    it('should create documents', () => {
      documentProperties.forEach(dp => {
        expect(Document).toHaveBeenCalledWith(
          dp,
          expect.anything(),
          expect.anything()
        )
      })
    })

    it('should expose as recent', () => {
      expect(sut.recent).toMatchObject(
        documentProperties.map(dp => ({ id: dp.id, observable: true }))
      )
    })

    it('should not add duplicates', () => {
      sut.addRecent(documentProperties)
      expect(sut.recent).toMatchObject(
        documentProperties.map(dp => ({ id: dp.id, observable: true }))
      )
    })
  })
})
