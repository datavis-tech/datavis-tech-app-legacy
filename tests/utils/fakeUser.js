
export default function () {
  return {
    username: String(Math.random()),
    displayName: String(Math.random()),
    _json: {
      avatar_url: String(Math.random())
    }
  }
}
