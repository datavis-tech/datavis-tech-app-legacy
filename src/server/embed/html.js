const logo = require('./logo')

module.exports = {
  withHtmlTag,
  withBodyTag,
  injectLogo
}

function withHtmlTag (src) {
  return wrapWithTag(src, 'html')
}

function withBodyTag (src) {

  if (hasOpeningAndClosingTag(src, 'html') && hasOpeningAndClosingTag(src, 'head')) {
    const content = src.match(/<\/head>([^]*)<\/html>/i)[1]
    return src.replace(content, wrapWithTag(content, 'body'))
  }

  return wrapWithTag(src, 'body')
}

function injectLogo (src) {
  const styles = `position:fixed;right:0;bottom:0;width:64px;height:64px;background-image:url(data:image/png;base64,${logo.base64})`
  const logoELement = `<div style="${styles}"></div>`
  const bodyAsInSrc = findOpeningTag(src, 'body')
  const insertionPosition = src.indexOf(`</${bodyAsInSrc}>`)
  return `${src.slice(0, insertionPosition)}${logoELement}${src.slice(insertionPosition)}`
}

function wrapWithTag (src, tag) {

  if (hasOpeningAndClosingTag(src, tag)) {
    return src
  }

  let prependBeforeBegining = ''
  let apendToEnd = ''
  let tagAsInSrc = findOpeningTag(src, tag)

  if (tagAsInSrc) {
    apendToEnd = `</${tagAsInSrc}>`
  } else {
    prependBeforeBegining = `<${tag}>`
    apendToEnd = `</${tag}>`
  }

  return `${prependBeforeBegining}${src}${apendToEnd}`
}

function hasOpeningAndClosingTag (src, tag) {
  return !!src.match(new RegExp(`<${tag}>[^]*</${tag}>`, 'i'))
}

function findOpeningTag (src, tag) {
  return (src.match(new RegExp(`<(${tag})>`, 'i')) || [])[1]
}
