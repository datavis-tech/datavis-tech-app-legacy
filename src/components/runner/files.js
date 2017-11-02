// Constructs the "files" object expected by MagicSandbox.js,
// using the file names from `references`, and content from `referenceDocs`.
export default (references, referenceDocs) => references
  .reduce((files, {fileName}, i) => {
    files[fileName] = {
      content: referenceDocs[i].data.content
    }
    return files
  }, {})
