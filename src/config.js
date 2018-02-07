// This file reads environment-specific configuration from environment variables,
// and falls back to defaults intended for use during local development.
module.exports = {
  redisHost: process.env.DVT_REDIS_HOST || '127.0.0.1',
  redisPort: process.env.DVT_REDIS_PORT || '6379',

  sessionSecret: process.env.DVT_SESSION_SECRET || 'dafhjdkasfhdjkashfjksa',

  gitHubClientId: process.env.DVT_GITHUB_CLIENT_ID || '25dbc152af91d189d2fc',
  gitHubClientSecret: process.env.DVT_GITHUB_CLIENT_SECRET || 'ac9faa321c0b0067ea52c1b32f31ee1de7b5a04e',
  gitHubCallbackURL: process.env.DVT_GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',

  mongoURL: process.env.DVT_MONGO_URL || 'mongodb://localhost:27017/datavistech',

  stripeSecretKey: process.env.DVT_STRIPE_SECRET_KEY || 'sk_test_Isw5Gw3q2WQmSuuU7q1Knll5',
  stripePublishableKey: process.env.DVT_STRIPE_PUBLISHABLE_KEY || 'pk_test_Y4thsPih1A0NNySQzyX7DQEi'
}
