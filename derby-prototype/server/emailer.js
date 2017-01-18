// This module is able to send emails.
var nodemailer = require("nodemailer");

var emailer = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    user: "postmaster@datavis.tech",
    pass: "824e96a6489bfb420c18fa1ab80b768c"
  }
});

emailer.noreply = "Datavis Tech<noreply@datavis.tech>";

module.exports = emailer;
