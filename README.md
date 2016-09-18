This is the repository for the [datavis.tech](datavis.tech) Web application.

To preview the file layout, run `tree -I node_modules\|build`. You should see something like this:

```
.
├── client
│   ├── index.html
│   ├── package.json
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── favicon.ico
│       ├── index.css
│       ├── index.js
│       └── logo.svg
├── npm-debug.log
├── README.md
└── server
    ├── package.json
    └── src
        ├── config.js
        ├── index.js
        ├── passport.js
        └── session.js
```

# Client

The client portion was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See the [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for documentation.

# Server

References:

 * [Example Node Server w/ Babel](https://github.com/babel/example-node-server)
