jest.mock('../../src/stores/document')
import Document from '../../src/stores/document'
import DocumentStore from '../../src/stores/documentStore'

describe('document store', () => {
  let sut
  let documentProperties
  let externalObserver

  beforeEach(() => {
    Document.mockImplementation(d => ({ id: d.id, observable: true }))

    documentProperties = [
      { id: String(Math.random()) },
      { id: String(Math.random()) },
      { id: String(Math.random()) }
    ]

    externalObserver = jest.fn()

    sut = DocumentStore(externalObserver)
  })

  it('should allow observe changes', () => {
    expect(externalObserver).toHaveBeenCalled()
  })

  describe('add recent documents', () => {
    beforeEach(() => {
      sut.addRecent(documentProperties)
    })

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
