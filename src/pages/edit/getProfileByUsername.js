import ProfileQuerySubscription from '../../db/subscriptions/profileQuerySubscription'

// TODO: test
export default (username) => {
  const subscription = ProfileQuerySubscription({username})
  return new Promise((resolve, reject) => {
    subscription.init({
      onUpdate: (profile) => {
        subscription.tearDown()
        if (profile) {
          resolve(profile)
        } else {
          reject(new Error('profile not found'))
        }
      },
      onError: () => {
        subscription.tearDown()
        reject(new Error('error')) // TODO: add better error message
      }
    })
  })
}
