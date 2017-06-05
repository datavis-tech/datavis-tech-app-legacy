// Produces a "snapshot" of a ShareDB document.
// 
// This representation is suitable for serializing into JSON,
// rendering into a page on the server, then passing into
// ingestSnapshot on the client side to hydrate the ShareDB model.
//
// The data structure expected by ingestSnapshot is described at
// https://github.com/share/sharedb#class-sharedbdoc
module.exports = function (doc){
  return {
    id: doc.id,
    v: doc.version,
    data: doc.data
  }
};
