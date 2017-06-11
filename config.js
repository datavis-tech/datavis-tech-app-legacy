module.exports = {
  // TODO read from environment variables
  redisHost: '127.0.0.1',
  redisPort: '6379',

  sessionSecret: 'dafhjdkasfhdjkashfjksa',

  gitHubClientId: '25dbc152af91d189d2fc',
  gitHubClientSecret: 'ac9faa321c0b0067ea52c1b32f31ee1de7b5a04e',
  gitHubCallbackURL: 'http://localhost:3000/auth/github/callback',

  mongoURL: 'mongodb://localhost:27017/datavistech'
}
