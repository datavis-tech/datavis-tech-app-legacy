import randomCase from 'random-case'
import logo from '../../../src/server/documentContentSandbox/logo'
import { withHtmlTag, withBodyTag, injectLogo } from '../../../src/server/documentContentSandbox/html'

describe('html', () => {

  let src
  let result

  describe('with html tag', () => {

    let htmlTagName
    let someContent

    beforeEach(() => {
      someContent = String(Math.random())
      htmlTagName = randomCase('html')
    })

    it('should close html tag if src contains only opening tag', () => {
      src = `<${htmlTagName}>${someContent}`
      result = withHtmlTag(src)
      expect(result).toEqual(`<${htmlTagName}>${someContent}</${htmlTagName}>`)
    })

    it('should add both opening and closing html tag if neither are present', () => {
      src = `${someContent}`
      result = withHtmlTag(src)
      expect(result).toEqual(`<html>${someContent}</html>`)
    })

    it('should preserver src as is if contains both opening and closing tags', () => {
      src = `<${htmlTagName}>${someContent}</${htmlTagName}>`
      result = withHtmlTag(src)
      expect(result).toEqual(src)
    })

    it('should be able to work with formmated html source', () => {
      src = `
          <!DOCTYPE html>
          <${htmlTagName}>
            <head></head>
              <body>
                ${someContent}
              </body>
          </${htmlTagName}>
          `
      result = withHtmlTag(src)
      expect(result).toEqual(src)
    })

  })

  describe('with body tag', () => {

    let bodyTagName
    let someContent

    beforeEach(() => {
      someContent = String(Math.random())
      bodyTagName = randomCase('body')
    })

    it('should close body if contains only opening tag', () => {
      src = `<${bodyTagName}>${someContent}`
      result = withBodyTag(src)
      expect(result).toEqual(`<${bodyTagName}>${someContent}</${bodyTagName}>`)
    })

    describe('no body', () => {

      it('should wrap src with body when no html tag', () => {
        src = `${someContent}`
        result = withBodyTag(src)
        expect(result).toEqual(`<body>${someContent}</body>`)
      })

      it('should wrap htmls content except head with body', () => {
        const htmlTagName = randomCase('html')
        const headTagName = randomCase('head')
        const headContent = String(Math.random())
        src = `<${htmlTagName}><${headTagName}>${headContent}</${headTagName}>${someContent}</${htmlTagName}>`
        result = withBodyTag(src)
        expect(result).toEqual(`<${htmlTagName}><${headTagName}>${headContent}</${headTagName}><body>${someContent}</body></${htmlTagName}>`)
      })

    })

    it('should preserver src as is if contains both opening and closing tags', () => {
      src = `<${bodyTagName}>${someContent}</${bodyTagName}>`
      result = withBodyTag(src)
      expect(result).toEqual(src)
    })

  })

  describe('inject logo', () => {

    let bodyTagName
    let someContent
    let href

    beforeEach(() => {
      someContent = String(Math.random())
      href = String(Math.random())
      bodyTagName = randomCase('body')
    })

    it('should inser logo before body closing tag', () => {
      src = `<${bodyTagName}>${someContent}</${bodyTagName}>`
      result = injectLogo(src, href)
      const styles = `position:fixed;right:0;bottom:0;width:64px;height:64px;background-image:url(data:image/png;base64,${logo.base64})`
      expect(result).toEqual(`<${bodyTagName}>${someContent}<a href="${href}" style="${styles}" target="_parent" /></${bodyTagName}>`)
    })

  })

})
