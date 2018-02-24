module.exports = function formatDocumentDescription (title, description, origin, originTitle, level = 1) {
  const _1stRow = `${'#'.repeat(level)} ${title}`
  const _2ndRow = `<sup>Exported from <a href="${origin}">Datavis.tech - ${originTitle}</a>.</sup>`
  const _3rdRow = description

  return `${_1stRow}\n\n${_2ndRow}\n\n${_3rdRow}`
}
