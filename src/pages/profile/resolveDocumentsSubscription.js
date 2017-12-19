import DocumentsForUserSubscription from '../../db/subscriptions/documentsForUserSubscription'
import DocumentsForOwnerSubscription from '../../db/subscriptions/documentsForOwnerSubscription'

// This module resolves which query to use for listing documents on the profile page,
// depending on whether or not the viewer is viewing their own profile.
//
// `user` is the user data for the currently logged in user (the viewer).
// `profile` is the user data for the user whose profile page we're viewing.
export default (user, profile) => {

  // If the user is authenticated and is viewing his/her own profile,
  if (user && (user.id === profile.id)) {

    // use the query for when the viewer is the owner,
    return DocumentsForOwnerSubscription({
      owner: profile.id
    })
  }

  // otherwise use the query for when the viewer is not the owner.
  return DocumentsForUserSubscription({
    owner: profile.id,
    id: user ? user.id : ''
  })
}
