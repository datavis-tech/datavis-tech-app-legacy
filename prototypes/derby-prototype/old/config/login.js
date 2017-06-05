// Draws from https://github.com/derbyparty/derby-login-example/blob/master/config/login.js

var emailer = require("../server/emailer");

module.exports = {
  collection: "auths",
  publicCollection: "users",
  user: {
    id: true,
    email: true,
    usernameChosen: true,
    username: true
  },
  successUrl: "/alpha",
  hooks: {
    sendChangeEmailConfirmation: function(userId, email, done) {
      var mailOptions = {
        from: emailer.noreply,
        to: email,
        subject: "Email change confirmation",
        html: '<a href="http://localhost:3000/auth/confirmemailchange' + "?id=" + userId + '">Confirm Email change</a>'
      };

      emailer.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err);
        } else {
          console.log("Message sent: " + info.response);
        }
        done(err);
      });
    },
    sendRegistrationConfirmation: function(userId, email, password, userData, done) {
      var mailOptions = {
        from: emailer.noreply,
        to: email,
        subject: "New account confirmation",
        html: [
          "<p>Hello,</p>",
          "<p>Please ",
          '<a href="http://localhost:3000/auth/confirmregistration' + "?id=" + userId + '">confirm your registration</a>',
          " to finish creating your new account at ",
          '<a href="https://datavis.tech">Datavis.tech</a>. Thank you.</p>',
          "<p>Best regards,<br>Datavis Tech Inc.</p>"
        ].join("")
      };

      emailer.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err);
        }else{
          console.log("Message sent: " + info.response);
        }
        done(err);
      });
    },
    sendRecoveryConfirmation: function(userId, email, secret, done) {
      var mailOptions = {
        from: emailer.noreply,
        to: email,
        subject: "Password Reset",
        html: '<a href="http://localhost:3000/recoverpassword' + "?secret=" + secret + '">Recover password</a>'
      };

      emailer.sendMail(mailOptions, function(err, info){
        if(err){
          console.log(err);
        }else{
          console.log("Message sent: " + info.response);
        }
        done(err);
      });
    },
    request: function(req, res, userId, isAuthenticated, done) {

      // Redirect all unAuth GET requests to loginUrl
      //if (!isAuthenticated && req.method === "GET" &&
      //    req.url !== this.options.confirmRegistrationUrl &&
      //    req.url !== this.options.loginUrl &&
      //    req.url !== this.options.registrationConfirmedUrl &&
      //    req.url.indexOf(this.options.recoverPasswordUrl) !== 0 &&
      //    req.url.indexOf("/auth/") !== 0) {
      //  return res.redirect(this.options.loginUrl);
      //}
      done();
    }
  }
}
