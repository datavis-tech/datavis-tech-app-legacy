var shareDbMongo = require("sharedb-mongo");
var redis = require("redis-url");
var redisPubSub = require("sharedb-redis-pubsub");

module.exports = store;

function store(derby, publicDir) {
  var db = shareDbMongo(process.env.MONGO_URL + "?auto_reconnect=true", { safe: true });

  derby.use(require("racer-bundle"));

  var pubsub = redisPubSub({
    client: redis.connect(),
    observer: redis.connect()
  });

  var store = derby.createBackend({
    db: db,
    pubsub: pubsub
  });


  // Add a projection that only includes certain fields.
  // This is for the document list page, so that the entire content
  // of each document is not transferred to the browser.
  store.addProjection("alpha_document_list", "alpha_documents", {
    id: true,
    title: true,
  });

  // No idea why this is necessary.
  //store.on("bundle", function(browserify) {
  //  var pack = browserify.pack;
  //  browserify.pack = function(opts) {
  //    var detectTransform = opts.globalTransform.shift();
  //    opts.globalTransform.push(detectTransform);
  //    return pack.apply(this, arguments);
  //  };
  //});

  return store;
}
