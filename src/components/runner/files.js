import { content } from '../../db/accessors'

// Constructs the "files" object expected by MagicSandbox.js,
// using the file names from `references`, and content from `referenceDocs`.
export default (references, referenceDocs) => references
  .reduce((files, {fileName}, i) => {
    files[fileName] = {
      content: content(referenceDocs[i])
    }
    return files
  }, {})
