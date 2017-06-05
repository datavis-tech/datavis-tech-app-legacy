This repository contains the Web application to be deployed at [https://datavis.tech](https://datavis.tech).

# Technology Stack

Backend

 * [ShareDB](https://github.com/share/sharedb) provides the foundation for real-time collaborative documents.
   * [JSON0 OT Type](https://github.com/ottypes/json0) - These invertable ops enable persistent document history.
   * Not using [The Plaintext OT Type](https://github.com/ottypes/text) because it's not invertable.
 * [Node.js](https://github.com/creationix/nvm)
 * [MongoDB](https://docs.mongodb.com/getting-started/shell/)
 * [Redis](https://redis.io/)

Frontend

 * [Nextjs](https://github.com/zeit/next.js) [starter](https://github.com/iaincollins/nextjs-starter)
 * [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React)
 * [CodeMirror](http://codemirror.net/)

# Getting Started

This section is for getting started with Datavis.tech on your development environment.

```
git clone git@gitlab.com:curran/data-vis-tech.git
cd data-vis-tech/
```

The repository uses [Git submodules](https://github.com/blog/2104-working-with-submodules) for static content like images (so the large files don't bloat the main repository).

```
git submodule init
git submodule update
```

Use NPM to install dependencies.

```
npm install
```

Set the development GitHub auth environment variables:

Use the `dev` command defined in `package.json` to start the development server (which watches for file changes).

```
npm run dev
```

# Production

## Initial Setup

SSH into the server.

```
ssh -i secret.pem ubuntu@datavis.tech
```

Configure NGINX.

```
sudo vim /etc/nginx/sites-available/default
sudo /etc/init.d/nginx restart
tail /var/log/nginx/error.log
```

Deployment.

```
npm install
npm run build
npm start
```

Redeployment.

```
git pull
npm install
npm run build
npm start
```
