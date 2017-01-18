var derby = require("derby");
var racer = require("racer");
var marked = require("marked");
var format = require("d3-format").format;
var timeFormat = require("d3-time-format").timeFormat;
var permissions = require("./permissions");

var app = module.exports = derby.createApp("app", __filename);

// Custom components.
app.component(require("../../components/beta-editor"));
app.component(require("../../components/beta-viewer"));
app.component(require("../../components/beta-viewer-fullscreen"));
app.component(require("../../components/beta-creator"));
app.component(require("../../components/table-viewer"));
app.component(require("../../components/vis-viewer"));
app.component(require("../../components/dataset-associator"));

app.use(require("derby-debug"));

// Expose Markdown parser for use in document description rendering.
app.proto.marked = marked;

// Expose a date format function common to many views.
var formatTime = timeFormat("%B %d, %Y");
app.proto.formatDate = function (dateStr){
  return formatTime(new Date(dateStr));
};

// Expose a number formatter that uses commas, e.g. "1,234".
app.proto.numberFormat = format(",");

app.loadViews(__dirname + "/views");

// Bootstrap CSS and overrides.
app.loadStyles(__dirname + "/styles/bootstrap.min.css");
app.loadStyles(__dirname + "/styles/bootstrap-overrides.css");

// CSS for views.
app.loadStyles(__dirname + "/styles/index.css");
app.loadStyles(__dirname + "/styles/home.css");

// CSS for components.
app.loadStyles(__dirname + "/styles/beta-home.css");
app.loadStyles(__dirname + "/styles/beta-editor.css");
app.loadStyles(__dirname + "/styles/beta-viewer.css");
app.loadStyles(__dirname + "/styles/beta-viewer-fullscreen.css");
app.loadStyles(__dirname + "/styles/beta-view-thumbnail.css");
app.loadStyles(__dirname + "/styles/table-viewer.css");
app.loadStyles(__dirname + "/styles/vis-viewer.css");

// Gets rid of the pesky HTML comments that appear in the title element.
// Without this, Google's index displays "<!--{{$render.prefix}}Title-->Datavis.tech<!--/{{$render.prefix}}"
// This requires that each route defines _page.title.
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

require("./routes/home")(app);
require("./routes/rfp")(app);
require("./routes/beta-home")(app, permissions);
require("./routes/beta-create")(app, permissions);
require("./routes/beta-edit")(app, permissions);
require("./routes/beta-view")(app, permissions);
require("./routes/beta-delete")(app);
require("./routes/beta-view-fullscreen")(app);
require("./routes/beta-view-thumbnail")(app);
require("./routes/beta-fork")(app, permissions);
