import connection from './connection'
import { DB_FEEDBACK_COLLECTION } from '../constants'
import generateId from './generateId'


// Creates an entry in the feedback collection.
const createFeedbackEntry = ({ feedback, user }) => {
  const id = generateId()
  const doc = connection.get(DB_FEEDBACK_COLLECTION, id)
  doc.create({

    // Human readable feedback, String.
    feedback,

    // The user who left this feedback.
    user
  })
}

export default createFeedbackEntry
