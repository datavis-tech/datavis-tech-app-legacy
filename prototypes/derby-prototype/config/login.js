module.exports = {
  // db collection
  collection: "auths",
  // projection of db collection
  publicCollection: "users",
  user: {
    id: true,
    email: true,
    github: true
  },
  confirmRegistration: false,
  // passportjs options
  passport: {
  },
  successUrl: "/beta",
  strategies: {
    github: {
      strategy: require("passport-github").Strategy,
      conf: require("./github")
    },
  },
  hooks: {
    request: function(req, res, userId, isAuthenticated, done) {
      done();
    }
  }
};
