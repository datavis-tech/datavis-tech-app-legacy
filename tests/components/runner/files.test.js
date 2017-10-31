import files from '../../../src/components/runner/files'
describe('files', () => {
  it('should construct the "files" object expected by MagicSandbox.js', () => {
    const references = [
      { fileName: 'foo' },
      { fileName: 'bar' }
    ]
    const docs = [
      { data: { content: 'fooContent'} },
      { data: { content: 'barContent'} }
    ]
    //console.log(JSON.stringify(files(references, docs), null, 2))
    expect(files(references, docs)).toMatchObject({
      foo: { content: 'fooContent' },
      bar: { content: 'barContent' }
    })
  })
})
