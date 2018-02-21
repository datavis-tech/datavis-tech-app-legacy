import fakeDoc from '../../utils/fakeDoc'
import sut from '../../../src/server/visualizationExport/formatVisualizationDesciption'

describe('format visualization desciption', () => {

  let docDesc
  let refsDescrs
  let result

  beforeEach(() => {

    docDesc = String(Math.random())
    refsDescrs = [String(Math.random()), String(Math.random()), String(Math.random())]

    const document = fakeDoc({data: {description: docDesc}}).data
    const referencedDocuments = refsDescrs.map(description => fakeDoc({data: {description}}).data)
    result = sut(document, referencedDocuments)
  })

  it('should created a single description from document description and ref descriptions separated by new line', () => {
    expect(result).toEqual(`${docDesc}\n\n${refsDescrs[0]}\n\n${refsDescrs[1]}\n\n${refsDescrs[2]}`)
  })
})
