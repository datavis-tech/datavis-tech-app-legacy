var express = require("express");
var emailer = require("./emailer");

var router = express.Router();

// When an RFP is submitted,
// email it to curran@datavis.tech.
router.post("/rfp", function(req, res){
  var to = "curran@datavis.tech";
  var d = req.body;

  var mailOptions = {
    from: emailer.noreply,
    to: to,
    subject: "RFP from " + d.email,
    html: [
      "<h1>" + d.title + "</h1>",
      "<p>" + d.description + "</h1>",
      d.data ? "<h2>Sample Data</h2><pre>" + d.data + "</pre>" : ""
    ].join("")
  };

  emailer.sendMail(mailOptions, function(err, info){
    if(err){
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
  res.redirect("/rfpsubmitted");
});

module.exports = router;
