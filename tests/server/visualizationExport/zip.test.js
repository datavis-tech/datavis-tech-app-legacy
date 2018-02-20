const mockZipped = Symbol('zipped')
const mockZip = {
  addFile: jest.fn(),
  toBuffer: () => mockZipped
}
jest.mock('adm-zip', () => jest.fn(() => mockZip))
jest.mock('../../../src/server/visualizationExport/formatVisualizationDesciption', () => jest.fn(() => 'combined description'))

import AdmZip from 'adm-zip'
import fakeDoc from '../../utils/fakeDoc'
import { serializeDocument } from '../../../src/db/serializers'
import formatVisualizationDesciption from '../../../src/server/visualizationExport/formatVisualizationDesciption'
import sut from '../../../src/server/visualizationExport/zip'

const permissions = 0o644

describe('zip', () => {

  const OriginalBuffer = global.Buffer

  beforeAll(() => {
    global.Buffer = {
      from: (src, encoding) => ({value: `${src} buffered`, encoding})
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

  it('should add description combined from both document and references as README.md to zip', () => {
    expect(formatVisualizationDesciption).toHaveBeenCalledWith(document, referencedDocuments)
    expect(mockZip.addFile).toHaveBeenCalledWith('README.md', {value: 'combined description buffered'}, null, permissions)
  })

  it('should add thumbnail as thumbnail.png to zip', () => {
    expect(mockZip.addFile).toHaveBeenCalledWith('thumbnail.png', {value: `${document.thumbnail} buffered`, encoding: 'base64'}, null, permissions)
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
