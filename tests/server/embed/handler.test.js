jest.mock('../../../src/server/embed/magicSandbox')
jest.mock('../../../src/server/embed/html')
jest.mock('../../../src/server/embed/getDocument')
jest.mock('../../../src/server/embed/getReferencedDocuments')

import magicSandbox from '../../../src/server/embed/magicSandbox'
import { injectLogo, withBodyTag, withHtmlTag } from '../../../src/server/embed/html'
import getDocument from '../../../src/server/embed/getDocument'
import getReferencedDocuments from '../../../src/server/embed/getReferencedDocuments'

import fakeDoc from '../../utils/fakeDoc'

import createHandler from '../../../src/server/embed/handler'

describe('handler', () => {

  let sut
  let backend
  let connection

  let req
  let res

  let document
  let content
  let references
  let referencedDocuments
  let html

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
    sut = createHandler(backend)

    req = {
      params: {
        id: String(Math.random())
      },
      query: {
        origin: String(Math.random())
      }
    }

    res = {
      send: jest.fn()
    }

    injectLogo.mockImplementation((c) => `${c} with logo`)
    withBodyTag.mockImplementation((c) => `${c} with body`)
    withHtmlTag.mockImplementation((c) => `${c} with html`)

    html = String(Math.random())
    magicSandbox.mockReturnValue(html)

    await sut(req, res)
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
      req.query.origin
    )
  })

  it('should send generated html as response', () => {
    expect(res.send).toHaveBeenCalledWith(html)
  })
})
