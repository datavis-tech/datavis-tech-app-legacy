import { DB_DOCUMENTS_COLLECTION } from '../../../src/constants'

jest.mock('../../../src/db/serializers', () => ({
    serializeDocument: document => `serialized document ${document.data.id}`
}))
import { serializeDocument } from '../../../src/db/serializers'

import fakeDocument from '../../utils/fakeDoc'
import { DocumentRepository } from '../../../src/server/repositories'

describe('document repository', () => {
    let sut
    let connection

    beforeEach(() => {
        connection = {
            createFetchQuery: jest.fn()
        }
        sut = DocumentRepository(connection)
    })

    describe('get recent documents', () => {
        const query = {
            $or: [
                { type: 'vis', viewCount: { $gte: 20 } },
                { type: 'data', viewCount: { $gte: 3 } }
            ],
            $sort: { viewCount: -1 },
            isPrivate: { $ne: true }
        }

        describe('everything is going ok', () => {
            let recentDocuments
            let documents

            beforeEach(async done => {
                recentDocuments = [fakeDocument(), fakeDocument(), fakeDocument()]
                connection.createFetchQuery.mockImplementation(
                    (c, q, o, callback) => {
                        callback(null, recentDocuments)
                    }
                )
                documents = await sut.getRecentDocuments()
                done()
            })

            it('should fetch recent documents from db', () => {
                expect(connection.createFetchQuery).toHaveBeenCalledWith(
                    DB_DOCUMENTS_COLLECTION,
                    query,
                    {},
                    expect.any(Function)
                )
            })

            it('should provide recent documents', () => {
                expect(documents).toEqual(recentDocuments.map(rd => `serialized document ${rd.data.id}`))
            })
        })

        it('should throw an error if something went wrong', async () => {
            connection.createFetchQuery.mockImplementation(
                (c, q, o, callback) => {
                    callback(new Error("something bad happen"))
                }
            )

            try {
                await sut.getRecentDocuments()
            } catch (e) {
                expect(e).toEqual({
                    reason: "something bad happen",
                });
            }
        })
    })
})
