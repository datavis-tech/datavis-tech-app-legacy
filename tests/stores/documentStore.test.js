jest.mock('../../src/stores/document')
import Document from '../../src/stores/document'
import DocumentStore from '../../src/stores/documentStore'

describe('document store', () => {
  let sut
  let documentProperties
  let externalObserver

  beforeEach(() => {
    Document.mockImplementation(d => ({ id: d.id, observable: true }))
    Document.mockClear()

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

  describe('add and get', () => {

    beforeEach(() => {
      sut.add(documentProperties)
    })

    it('should contain added documents', () => {
      documentProperties.forEach(d => {
        expect(sut.getById(d.id)).toMatchObject({ id: d.id, observable: true })
      })
    })

    it('should not contain duplicates', () => {
      sut.add([documentProperties[0]])
      expect(Document).toHaveBeenCalledTimes(3)
    })

  })

  describe('delete', () => {

    let dp

    beforeEach(() => {
      dp = documentProperties[0]
      sut.add([dp])
    })

    it('should delete document', () => {
      const doc = sut.getById(dp.id)
      sut.remove(doc)

      // if document was deleted store should allow to store the same doc again
      sut.add([dp])
      expect(Document).toHaveBeenCalledTimes(2)
    })

    it('should call back on delete', () => {
      const callback = jest.fn()
      const doc = sut.getById(dp.id)
      sut.remove(doc, callback)

      expect(callback).toHaveBeenCalled()
    })

  })
})
