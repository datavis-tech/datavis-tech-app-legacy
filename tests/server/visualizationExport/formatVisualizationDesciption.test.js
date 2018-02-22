jest.mock('../../../src/routesUtils', () => ({
  getHrefForRoute: jest.fn((_, {id}) => `${id} origin href`)
}))

jest.mock('../../../src/server/visualizationExport/formatDocumentDescription', () => jest.fn((title) => `${title} formatted`))
import formatDocumentDescription from '../../../src/server/visualizationExport/formatDocumentDescription'

import fakeDoc from '../../utils/fakeDoc'
import sut from '../../../src/server/visualizationExport/formatVisualizationDesciption'

describe('format visualization desciption', () => {

  let document
  let referencedDocuments
  let fileNames

  let docDesc
  let refsDescrs
  let result

  beforeEach(() => {

    docDesc = String(Math.random())
    refsDescrs = [String(Math.random()), String(Math.random()), String(Math.random())]
    fileNames = [String(Math.random()), String(Math.random()), String(Math.random())]

    referencedDocuments = refsDescrs.map(description => fakeDoc({data: {description}}).data)

    document = fakeDoc({
      data: {
        description: docDesc,
        references: referencedDocuments.map((d, i) => ({id: d.id, fileName: fileNames[i]}))
      }
    }).data

    result = sut(document, referencedDocuments)
  })

  it('should format root document description', () => {
    expect(formatDocumentDescription).toHaveBeenCalledWith(document.title, document.description, `${document.id} origin href`, document.title)
  })

  it('should format references descriptions', () => {
    referencedDocuments.forEach((rd, i) => {
      expect(formatDocumentDescription).toHaveBeenCalledWith(fileNames[i], rd.description, `${rd.id} origin href`, rd.title, 2)
    })
  })

  it('should provide formatted description which consist of document\'s and references\' descriptions', () => {

    const _1stRow = `${document.title} formatted`
    const _2ndRow = `${fileNames[0]} formatted`
    const _3rdRow = `${fileNames[1]} formatted`
    const _4thRow = `${fileNames[2]} formatted`

    const description = `${_1stRow}\n\n${_2ndRow}\n\n${_3rdRow}\n\n${_4thRow}`

    expect(result).toEqual(description)
  })

})
