import { autorun } from 'mobx'
import Document from '../../src/stores/document'

describe('document', () => {
  let sut
  let documentProperties

  beforeEach(() => {
    documentProperties = {
      id: String(Math.random()),
      title: String(Math.random()),
      description: String(Math.random()),
      content: String(Math.random()),
      references: String(Math.random()),
      isPrivate: String(Math.random()),
      type: String(Math.random())
    }

    sut = Document(documentProperties)
  })

  it('should expose an id', () => {
    expect(sut.id).toEqual(documentProperties.id)
  })

  it('should allow to keep track title changes', done => {
    checkObservable(sut, 'title', done)
  })

  it('should allow to keep track description changes', done => {
    checkObservable(sut, 'description', done)
  })

  it('should allow to keep track content changes', done => {
    checkObservable(sut, 'content', done)
  })

  it('should allow to keep track references changes', done => {
    checkObservable(sut, 'references', done)
  })

  it('should allow to keep track privacy changes', done => {
    checkObservable(sut, 'isPrivate', done)
  })

  it('should allow to check if the document is a visualization', done => {
    const changes = []
    const dispose = autorun(() => {
      changes.push(sut.isVisualization.get())
    })

    setTimeout(() => {
      sut.type = 'vis'
      setTimeout(() => {

        expect(changes[0]).toBeFalsy()
        expect(changes[1]).toBeTruthy()

        dispose()
        done()
      }, 0)
    }, 0)
  })
})

function checkObservable (sut, prop, done) {
  const newValue = String(Math.random())
  sut[prop] = newValue
  autorun(r => {
    expect(sut[prop]).toEqual(newValue)
    r.dispose()
    done()
  })
}
