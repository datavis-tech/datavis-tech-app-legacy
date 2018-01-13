jest.mock('../../../src/server/documentContentSandbox/magicSandbox')
jest.mock('../../../src/server/documentContentSandbox/html')
jest.mock('../../../src/server/documentContentSandbox/getDocument')
jest.mock('../../../src/server/documentContentSandbox/getReferencedDocuments')

import magicSandbox from '../../../src/server/documentContentSandbox/magicSandbox'
import { injectLogo, withBodyTag, withHtmlTag } from '../../../src/server/documentContentSandbox/html'
import getDocument from '../../../src/server/documentContentSandbox/getDocument'
import getReferencedDocuments from '../../../src/server/documentContentSandbox/getReferencedDocuments'

import fakeDoc from '../../utils/fakeDoc'

import createDocumentContentSandbox from '../../../src/server/documentContentSandbox'

describe('document content sandbox', () => {

  let sut
  let backend
  let connection

  let id
  let origin
  let href

  let document
  let content
  let references
  let referencedDocuments
  let html
  let result

  beforeEach(async (done) => {

    references = [
      {id: String(Math.random()), fileName: String(Math.random())},
      {id: String(Math.random()), fileName: String(Math.random())}
    ]

    content = String(Math.random())

    document = fakeDoc({data: {content, references}})

    getDocument.mockReturnValue(() => Promise.resolve(document))

    referencedDocuments = [
      fakeDoc({id: references[0].id, data: {}}),
      fakeDoc({id: references[1].id, data: {}})
    ]
    getReferencedDocuments.mockReturnValue(() => Promise.resolve(referencedDocuments))

    connection = Symbol('connection')
    backend = {
      connect: jest.fn(() => connection)
    }
    sut = createDocumentContentSandbox(backend)

    injectLogo.mockImplementation((c) => `${c} with logo`)
    withBodyTag.mockImplementation((c) => `${c} with body`)
    withHtmlTag.mockImplementation((c) => `${c} with html`)

    html = String(Math.random())
    magicSandbox.mockReturnValue(html)

    id = String(Math.random())
    href = String(Math.random())
    origin = String(Math.random())   

    result = await sut({
      id,
      href,
      origin
    })
    done()
  })

  it('should connect to the backend on creation', () => {
    expect(backend.connect).toHaveBeenCalled()
  })

  it('should render html from content, files and origin using sandbox', () => {
    expect(magicSandbox).toHaveBeenCalledWith(
      `${content} with html with body with logo`,
      {
        [references[0].fileName]: {content: referencedDocuments[0].data.content},
        [references[1].fileName]: {content: referencedDocuments[1].data.content}
      },
      origin
    )
  })

  it('should send generated html as response', () => {
    expect(result).toEqual(html)
  })
})
