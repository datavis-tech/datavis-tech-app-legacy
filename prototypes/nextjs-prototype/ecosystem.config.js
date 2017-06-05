module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'data-vis-tech',
      script    : 'node',
      args      : 'server.js',
      env: {
        GITHUB_CLIENT_ID: '25dbc152af91d189d2fc',
        GITHUB_CLIENT_SECRET: 'ac9faa321c0b0067ea52c1b32f31ee1de7b5a04e',
        REDIS_HOST: 'localhost',
        REDIS_PORT: '6379',
        SESSION_SECRET: 'kfn854j3k48emvdhjks85ur93jd29'
      },
      env_production : {
        NODE_ENV: 'production',
        GITHUB_CLIENT_ID: '4a5895f9d2ce03f2f3c3',
        GITHUB_CLIENT_SECRET: '9d8b01ee2febc243011190a9fd14d8364af03507',
        REDIS_HOST: 'localhost',
        REDIS_PORT: '6379',
        SESSION_SECRET: 'kfn854j3k48emvdhjks85snpijd29'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
   */
};
