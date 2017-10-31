// Constructs the "files" object expected by MagicSandbox.js,
// using the file names from `references`, and content from `docs`.
export default (references, docs) => references
  .reduce((o, {fileName}, i) => {
    o[fileName] = { content: docs[i].data.content }
    return o
  }, {})
