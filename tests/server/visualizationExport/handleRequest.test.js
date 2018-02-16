jest.mock('../../../src/server/visualizationExport/export')

import exportVisualization from '../../../src/server/visualizationExport/export'
import createRequestHandler from '../../../src/server/visualizationExport/handleRequest'

describe('handle request', () => {

  let sut
  let connection
  let exporter
  let exportedVis

  beforeEach(() => {

    exportedVis = {
      zip: Symbol('zipped document'),
      fileName: String(Math.random())
    }
    exporter = jest.fn(() => exportedVis)
    exportVisualization.mockReturnValue(exporter)

    connection = Symbol('connection')
    sut = createRequestHandler(connection)

  })

  it('should create exporter bound to connection', () => {
    expect(exportVisualization).toHaveBeenCalledWith(connection)
  })

  describe('handling request', () => {

    let request
    let response

    beforeEach(async (done) => {

      request = {
        params: {
          id: String(Math.random())
        }
      }

      response = {
        set: jest.fn(),
        send: jest.fn()
      }

      await sut(request, response)

      done()
    })

    it('should zip archive content type', () => {
      expect(response.set).toHaveBeenCalledWith({
        'Content-Disposition': `attachment; filename="${exportedVis.fileName}"`,
        'Content-Type': 'application/zip'
      })
    })

    it('should export visualization using id from request', () => {
      expect(exporter).toHaveBeenCalledWith(request.params.id)
    })

    it('should send export results', () => {
      expect(response.send).toHaveBeenCalledWith(exportedVis.zip)
    })

  })

})
