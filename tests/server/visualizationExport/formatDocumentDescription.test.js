import sut from '../../../src/server/visualizationExport/formatDocumentDescription'

describe('format document description', () => {

  let title
  let description
  let origin
  let originTitle
  let level
  let parts

  beforeEach(() => {
    title = String(Math.random())
    description = String(Math.random())
    origin = String(Math.random())
    originTitle = String(Math.random())
    level = Math.round(Math.random(0, 1) * 10)

    parts = sut(title, description, origin, originTitle, level).split('\n\n')
  })

  it('should have title marked as header in first raw', () => {
    expect(parts[0]).toEqual(`${'#'.repeat(level)} ${title}`)
  })

  it('should have a link in second row', () => {
    expect(parts[1]).toEqual(`<sup>Exported from <a href="${origin}">Datavis.tech - ${originTitle}</a>.</sup>`)
  })

  it('should have a description in third row', () => {
    expect(parts[2]).toEqual(description)
  })
})
