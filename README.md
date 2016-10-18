This is the repository for the [datavis.tech](datavis.tech) Web application.

# Client

The client portion was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See the [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for documentation.

# Server

```
npm run serve &
npm start
```

References:

 * [Example Node Server w/ Babel](https://github.com/babel/example-node-server)

# Workflow

There is a Git submodule for static assets, so when you first check out the repository, the following commands are necessary:

```
git@gitlab.com:curran/datavis-tech.git
git submodule init
git submodule update
```
