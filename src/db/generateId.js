import uuidV4 from 'uuid/v4'

// Generates a document ID using UIID.
// Dashes are stripped, so it's easier for users to
// select the full id in the URL by double-clicking.
const generateId = () => uuidV4().replace(/-/g, '')

export default generateId
