// This utility creates a fake "user" object that can be used
// in any tests where a user object is required.
export default () => ({
  data: {
    username: String(Math.random()),
    displayName: String(Math.random()),
    _json: {
      avatar_url: String(Math.random())
    }
  }
})
