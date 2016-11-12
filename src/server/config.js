// The port of the API server.
export const port = 8080

// The secret used with express-session.
export const SESSION_SECRET = 'kfn854j3k48emvdhjks85ur93jd29'

// Constants for GitHub OAuth.
export const GITHUB_CLIENT_ID = '25dbc152af91d189d2fc'
export const GITHUB_CLIENT_SECRET = 'ac9faa321c0b0067ea52c1b32f31ee1de7b5a04e'
export const GITHUB_CALLBACK_URL = 'http://localhost/api/auth/github/callback'

// Constants for Redis connection.
export const REDIS_HOST = '127.0.0.1'
export const REDIS_PORT = '6379'
