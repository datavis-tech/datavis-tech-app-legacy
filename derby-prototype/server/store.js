var shareDbMongo = require("sharedb-mongo");

module.exports = store;

function store(derby, publicDir) {
  var db = shareDbMongo(process.env.MONGO_URL + "?auto_reconnect=true", {safe: true});

  derby.use(require("racer-bundle"));

  var redis = require("redis-url");
  var redisPubSub = require("sharedb-redis-pubsub");

  var pubsub = redisPubSub({
    client: redis.connect(),
    observer: redis.connect()
  });

  var store = derby.createBackend({
    db: db,
    pubsub: pubsub
  });

  store.on("bundle", function(browserify) {

    var pack = browserify.pack;
    browserify.pack = function(opts) {
      var detectTransform = opts.globalTransform.shift();
      opts.globalTransform.push(detectTransform);
      return pack.apply(this, arguments);
    };
  });

  return store;
}
