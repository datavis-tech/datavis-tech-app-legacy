jest.mock('../../../src/server/documentContentSandbox/getDocument')
import getDocument from '../../../src/server/documentContentSandbox/getDocument'

jest.mock('../../../src/server/documentContentSandbox/getReferencedDocuments')
import getReferencedDocuments from '../../../src/server/documentContentSandbox/getReferencedDocuments'

jest.mock('../../../src/server/visualizationExport/zip')
import zip from '../../../src/server/visualizationExport/zip'

import { serializeDocument } from '../../../src/db/serializers'

import fakeDoc from '../../utils/fakeDoc'

import sut from '../../../src/server/visualizationExport/export'

describe('export', () => {

  let connection
  let id
  let title
  let document
  let referencesIds
  let references
  let zipped
  let result

  beforeEach(async (done) => {
    connection = Symbol('connection')
    id = String(Math.random())
    title = `title with spaces`

    referencesIds = [String(Math.random()), String(Math.random()), String(Math.random())]
    document = fakeDoc({data: {title, references: referencesIds.map(id => ({id}))}})
    getDocument.mockReturnValue(document)
    references = referencesIds.map(id => fakeDoc({id, data: {}}))
    getReferencedDocuments.mockReturnValue(references)

    zipped = Symbol('zipped')
    zip.mockReturnValue(zipped)

    result = await sut(connection, id)
    done()
  })

  it('should get document by id', () => {
    expect(getDocument).toHaveBeenCalledWith(connection, id)
  })

  it('should get referenced documents by references ids', () => {
    expect(getReferencedDocuments).toHaveBeenCalledWith(connection, referencesIds)
  })

  it('should zip serialized document and its references', () => {
    expect(zip).toHaveBeenCalledWith(serializeDocument(document), references.map(serializeDocument))
  })

  it('should return zipped archive', () => {
    const { zip, fileName } = result
    expect(zip).toBe(zipped)
    expect(fileName).toBe('title_with_spaces.zip')
  })

})
