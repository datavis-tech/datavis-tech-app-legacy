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

function injectLogo (src, href) {
  const styles = `position:fixed;right:3px;bottom:3px;opacity:0.8;`
  const imgSrc = `data:image/png;base64,${logo.base64}`
  const logoElement = `<a href="${href}" target="_parent"><img style="${styles}" width="32" height="32" src=${imgSrc}></a>`
  const bodyAsInSrc = findOpeningTag(src, 'body')
  const insertionPosition = src.indexOf(`</${bodyAsInSrc}>`)
  return `${src.slice(0, insertionPosition)}${logoElement}${src.slice(insertionPosition)}`
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
