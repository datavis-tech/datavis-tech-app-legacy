const { constants } = require('fs')
const AdmZip = require('adm-zip')
const { files } = require('../../db/accessors')

const _rw_r__r__ = constants.S_IRUSR | constants.S_IWUSR | constants.S_IRGRP | constants.S_IROTH // eslint-disable-line

function addToZipAsFile (zip, name, content) {
  // Without setting permission entry is created as directory not as file
  // For details check out https://github.com/cthackers/adm-zip/issues/182
  zip.addFile(name, Buffer.from(content), null, _rw_r__r__)
}

module.exports = (document, referencedDocuments) => {
  const zip = new AdmZip()
  const add = addToZipAsFile.bind(null, zip)
  const referencesAsFiles = files(document.references, referencedDocuments)

  add('index.html', document.content)
  add('README.md', document.description)

  Object
    .keys(referencesAsFiles)
    .forEach(fileName => add(fileName, referencesAsFiles[fileName].content))

  return zip.toBuffer()
}
