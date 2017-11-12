// This utility creates a fake "user" object that can be used
// in any tests where a user object is required.
export default () => ({
  data: {
    username: 'fred',
    displayName: 'Fred',
    _json: {
      avatar_url: 'https://avatars2.githubusercontent.com/u/156229?v=4'
    }
  }
})
