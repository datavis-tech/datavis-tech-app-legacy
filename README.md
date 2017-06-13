This repository contains the Web application deployed at [https://datavis.tech](https://datavis.tech).

# Technology Stack

 * [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React)
 * [Nextjs](https://github.com/zeit/next.js)
 * [ShareDB](https://github.com/share/sharedb)
 * [Express](https://github.com/expressjs/express)
 * [Passport](http://passportjs.org/)
 * [Redis](https://redis.io/)
 * [MongoDB](https://docs.mongodb.com/getting-started/shell/)

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

Start Redis and MongoDB locally using the default ports.

Start the server locally for development with:

```
npm start
```
