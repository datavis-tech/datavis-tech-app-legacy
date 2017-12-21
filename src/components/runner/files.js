// Constructs the "files" object expected by MagicSandbox.js,
// using the file names from `references`, and content from `referenceDocs`.
export default (references, referenceDocuments) => references
  .reduce((files, {fileName}, i) => {
    files[fileName] = {
      content: referenceDocuments[i].content
    }
    return files
  }, {})
