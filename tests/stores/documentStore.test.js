jest.mock('../../src/stores/socket')
import socket from '../../src/stores/socket'

jest.mock('../../src/stores/document')
import Document from '../../src/stores/document'
import DocumentStore from '../../src/stores/documentStore'

describe('document store', () => {
    let sut
    let documentProperties

    beforeEach(() => {
        Document.mockImplementation(d => ({ id: d.id, observable: true }))

        documentProperties = [
            { id: String(Math.random()) },
            { id: String(Math.random()) },
            { id: String(Math.random()) }
        ]

        sut = DocumentStore(socket)
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

    describe('subscription', () => {
        beforeEach(() => {
            sut.addRecent(documentProperties)
        })

        it('should subscribe to added documents changes', () => {
            documentProperties.forEach(dp => {
                expect(socket.emit).toHaveBeenCalledWith('subscribe', {
                    id: dp.id
                })
            })
        })

        it('should listen to changes', () => {
          expect(socket.on).toHaveBeenCalledWith('change', expect.any(Function))
        })

        // TODO implement
        xit('should observe changes', done => {
          // socket.on.mock.calls[0][1](documentProperties[0].id, {})
        })
    })
})
