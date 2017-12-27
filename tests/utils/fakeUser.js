// This utility creates a fake "user" object that can be used
// in any tests where a user object is required.
export const fakeUser = options => {
  const {id, username, displayName, avatarUrl} = options || {id: String(Math.random())}
  return {
    id,
    data: {
      id,
      username: username || String(Math.random()),
      displayName: displayName || String(Math.random()),
      _json: {
        avatar_url: avatarUrl || String(Math.random())
      }
    }
  }
}

// Deterministic behavior for snapshot testing.
fakeUser.deterministic = fakeUser({
  username: 'fred',
  displayName: 'Fred',
  avatarUrl: 'https://avatars2.githubusercontent.com/u/156229?v=4'
})

export default fakeUser
