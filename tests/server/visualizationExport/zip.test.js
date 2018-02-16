const mockZipped = Symbol('zipped')
const mockZip = {
  addFile: jest.fn(),
  toBuffer: () => mockZipped
}
jest.mock('adm-zip', () => jest.fn(() => mockZip))

import AdmZip from 'adm-zip'
import fakeDoc from '../../utils/fakeDoc'
import { serializeDocument } from '../../../src/db/serializers'
import sut from '../../../src/server/visualizationExport/zip'

const permissions = 0o644

describe('zip', () => {

  const OriginalBuffer = global.Buffer

  beforeAll(() => {
    global.Buffer = {
      from: src => ({value: `${src} buffered`})
    }
  })

  afterAll(() => {
    global.Buffer = OriginalBuffer
  })

  let document
  let referencedDocuments
  let referencesNames
  let result

  beforeEach(() => {
    referencesNames = [String(Math.random()), String(Math.random())]
    document = serializeDocument(fakeDoc({data: {references: referencesNames.map(fileName => ({fileName}))}}))
    referencedDocuments = referencesNames.map(() => serializeDocument(fakeDoc()))
    result = sut(document, referencedDocuments)
  })

  it('should create zip file', () => {
    expect(AdmZip).toHaveBeenCalled()
  })

  it('should add content as index.html to zip', () => {
    expect(mockZip.addFile).toHaveBeenCalledWith('index.html', {value: `${document.content} buffered`}, null, permissions)
  })

  it('should add description as README.md to zip', () => {
    expect(mockZip.addFile).toHaveBeenCalledWith('README.md', {value: `${document.description} buffered`}, null, permissions)
  })

  it('should add references as their filenames to zip', () => {
    referencesNames.forEach((fileName, i) => {
      expect(mockZip.addFile).toHaveBeenCalledWith(fileName, {value: `${referencedDocuments[i].content} buffered`}, null, permissions)
    })
  })

  it('should provide compressed buffer', () => {
    expect(result).toBe(mockZipped)
  })

})
