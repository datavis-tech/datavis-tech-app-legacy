var derby = require("derby");
var racer = require("racer");
var marked = require("marked");
var md5 = require("blueimp-md5");
var loginComponents = require("derby-login/components");

var app = module.exports = derby.createApp("app", __filename);

app.use(loginComponents);

app.loadViews(__dirname + "/views");
app.loadStyles(__dirname + "/styles");

// Gets rid of the pesky HTML comments that appear in the title element.
// Without this, Google's index displays "<!--{{$render.prefix}}Title-->Datavis.tech<!--/{{$render.prefix}}"
if (racer.util.isServer) {
  app.views.register("TitleElement", "<title>{{_page.title}}</title>");
}

// Associate the user object on all requests.
// From https://github.com/derbyparty/derby-login-example/blob/master/apps/app/index.js#L14
app.get("*", function(page, model, params, next) {
  if (model.get("_session.loggedIn")) {
    var userId = model.get("_session.userId");
    var $user = model.at("users." + userId);
    model.subscribe($user, function() {
      model.ref("_session.user", $user);
      next();
    });
  } else {
    next();
  }
});


app.get("/chooseusername", function (page, model){
  if (model.get("_session.loggedIn")) {
    model.set("_page.title", "Choose Username");
    model.set("_page.desiredUsername", "");
    page.render("chooseUsername");
  } else {
    // TODO set redirect URL here.
    page.redirect("/login");
  }
}); 


app.get("/registrationconfirmed", function (page, model){
  model.set("_page.title", "Registration Confirmed");
  page.render("registrationconfirmed");
});


app.proto.checkUsernameAvailability = function (e){
  e.preventDefault();
  var desiredUsername = app.model.get("_page.desiredUsername");

  // Enforce no spaces and case insensitivity.
  desiredUsername = desiredUsername.toLowerCase().replace(/\s/g, "-");

  var query = app.model.query("users", { username: desiredUsername });
  query.fetch(function (){
    var usernameAvailable = query.get().length === 0;

    // Reserve the username, so if others check its availability before it is "chosen",
    // it will appear as already taken. The user commits to the name only after
    // _session.user.usernameChosen is set to true.
    if(usernameAvailable){
      app.model.set("_session.user.username", desiredUsername);
    }

    app.model.set("_page.checkedUsername", desiredUsername);
    app.model.set("_page.usernameAvailable", usernameAvailable);
    app.model.set("_page.checkedUsername", desiredUsername);
  });
}


// Force newly signed up users to choose their username.
app.get("*", function(page, model, params, next) {
  if (model.get("_session.loggedIn") && !model.get("_session.user.username")){
    page.redirect("chooseusername");
  } else {
    next();
  }
});



// The Home Page.
app.get("/", function(page, model){
  model.set("_page.title", "Datavis.tech");
  model.set("_page.hideLogin", true);

  model.set("_page.training", [
    {
      title: "Introduction to Data Visualization",
      description: "An introduction to data visualization. This covers fundamental visualization concepts like data tables, column types, aggregation, and visual encoding using marks and channels.",
      videoURL: "https://www.youtube.com/watch?v=itNlukt5x18&feature=youtu.be",
      sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/introDataVisD3",
      imageURL: "/img/training/introDataVisD3.png"
    },
    {
      title: "Introduction to D3.js",
      description: "This tutorial teaches data visualization with D3.js from the ground up. After watching this, you will know how to make a scatter plot, bar chart, and line chart.",
      videoURL: "https://www.youtube.com/watch?v=8jvoTV54nXw",
      sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/introToD3",
      imageURL: "/img/training/introD3.png"
    },
    {
      title: "Splitting Charts",
      description: "Covers how to add an additional dimension of data to a bar chart. Rectangles are split into stacked bars using d3 nest and d3 stack layout, giving a new view into the breakdown of religions across the largest 5 countries.",
      videoURL: "https://www.youtube.com/watch?v=6Xynj_pBybc",
      sourceURL: "https://github.com/curran/screencasts/tree/gh-pages/splittingCharts",
      imageURL: "/img/training/splittingCharts.png"
    }
    //{
    //  title: "",
    //  description: "",
    //  videoURL: "",
    //  sourceURL: "",
    //  imageURL: ""
    //},
  ]);
  page.render("home");
});


// The Request for Proposal Page.
// Form post route defined in /server/routes.js
app.get("/rfp", function (page, model){
  model.set("_page.title", "Request for Proposal - Datavis.tech");
  model.set("_page.hideLogin", true);
  page.render("rfp");
});

app.get("/rfpsubmitted", function (page, model){
  model.set("_page.title", "Request for Proposal Submitted");
  model.set("_page.hideLogin", true);
  page.render("rfpsubmitted");
});


// The Document list.
app.get("/alpha", function(page, model, params, next) {
  var query = model.query("alpha_document_list", {}).subscribe( function (err){
    if(err) { return next(err); }
    query.ref("_page.documents");
    model.set("_page.title", "Documents");
    page.render("documentList");
  });
});

// Generate a UUID then strip dashes.
function generateDocumentId(model){
  return model.id().replace(/-/g, "");
}


// Creates a document
app.get("/alpha/create", function(page, model, params, next) {
  if (model.get("_session.loggedIn")) {

    var id = generateDocumentId(model);

    model.add("alpha_documents", {
      id: id,
      owner: model.get("_session.user.id"),
      title: "Untitled",
      description: "",
      content: ""
    });

    page.redirect("/alpha/" + id + "/edit");

  } else {

    // TODO set post-login redirect URL to "/alpha/create"
    page.redirect("/login");
  }
});


// Forks a document
app.get("/alpha/:id/fork", function(page, model, params, next) {

  var doc = model.at("alpha_documents." + params.id);

  doc.fetch(function(err) {
    if (err) return next(err);

    // If the document does not exist, render an error page.
    if (!doc.get()){
      model.set("_page.title", "Error");
      model.set("_page.id", params.id);
      page.render("documentError");
    } else {

      var id = generateDocumentId(model);
      model.add("alpha_documents", {
        id: id,
        title: "Copy of " + doc.get("title"),
        description: [
          doc.get("description") + "\n\nForked from ",
          "[" + doc.get("title") + "]",
          "(/alpha/" + params.id + ")."
        ].join(""),
        content: doc.get("content")
      });

      page.redirect("/alpha/" + id + "/edit");

    }
  });
});


// Defines the "editorTitle" for use in the edit route.
app.on("model", function (model){
});

// The Document Editor.
app.get("/alpha/:id/edit", function(page, model, params, next) {
  model.fn("editorTitle", function (title){
    return title + " (editing)";
  });
  var doc = model.at("alpha_documents." + params.id);

  doc.subscribe(function(err) {
    if (err) return next(err);

    // If the document does not exist, render an error page.
    if (!doc.get()){
      model.set("_page.title", "Error");
      model.set("_page.id", params.id);
      page.render("documentError");
    } else {

      model.ref("_page.document", doc); 
      model.start("_page.title", "_page.document.title", "editorTitle");
      page.render("documentEdit");

    }
  });
});


// The Document viewer.
app.get("/alpha/:id", function(page, model, params, next) {

  var doc = model.at("alpha_documents." + params.id);
  doc.subscribe(function(err) {
    if (err) return next(err);

    // If the document does not exist, render an error page.
    if (!doc.get()){
      model.set("_page.title", "Error");
      model.set("_page.id", params.id);
      page.render("documentError");
    } else {

      // Otherwise render the document viewer.
      model.ref("_page.document", doc); 
      model.ref("_page.title", "_page.document.title");
      page.render("document");
    }
  });

});


// The Raw Document viewer.
app.get("/alpha/:id/raw", function(page, model, params, next) {

  var doc = model.at("alpha_documents." + params.id);
  doc.subscribe(function(err) {
    if (err) return next(err);

    // If the document does not exist, render an error page.
    if (!doc.get()){
      model.set("_page.title", "Error");
      model.set("_page.id", params.id);
      page.render("documentError");
    } else {

      // Otherwise render the document viewer.
      model.ref("_page.title", "_page.document.title");
      model.ref("_page.document", doc); 
      page.render("documentRaw");
    }
  });

});


// Deletes a document
app.get("/alpha/:id/delete", function(page, model, params, next) {
  model.at("alpha_documents." + params.id).del();
  page.redirect("/alpha");
});


// Expose Markdown parser for use in document description rendering.
app.proto.marked = marked;

// This function generates the URL of a Gravatar profile image.
// See https://en.gravatar.com/site/implement/images/
app.proto.gravatar = function(email, size){
  var base = "http://www.gravatar.com/avatar/";
  var hash = md5(email.trim().toLowerCase());
  return base + hash + "?s=" + size;
}

// Routes related to login.
app.get("/login", function (page, model){
  model.set("_page.title", "Log in");
  page.render("login");
});

app.get("/register", function (page, model){
  model.set("_page.title", "Register");
  page.render("register");
});

app.get("/confirmregistration", function (page, model){
  model.set("_page.title", "Confirm Registration");
  page.render("confirmregistration");
});


app.get("/profile", function (page, model){
  if (model.get("_session.loggedIn")) {
    page.render("profile");
  } else {
    page.redirect("/login");
  }
});
