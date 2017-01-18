var async = require("async");
var derby = require("derby");

var http  = require("http");

var publicDir = process.cwd() + "/public";

derby.run(function(){

  require("./server/config");

  var apps = [
    require("./apps/app")
  ];

  var express = require("./server/express");

  var store = require("./server/store")(derby, publicDir);
  require("./server/accessControl")(store);
  require("./server/projections")(store);

  var error = require("./server/error");

  express(store, apps, error, publicDir, function(expressApp, upgrade){
    var server = http.createServer(expressApp);

    server.on("upgrade", upgrade);

    async.each(apps, bundleApp, function(){
      server.listen(process.env.PORT, function() {
        console.log("%d listening. Go to: http://localhost:%d/",
            process.pid, process.env.PORT);
      });
    });

    function bundleApp (app, cb) {
      app.writeScripts(store, publicDir, {}, function(err){
        if (err) {
          console.log("Bundle not created:", app.name, ", error:", err);
        } else {
          console.log("Bundle created:", app.name);
        }
        cb();
      });
    }
  });
});
