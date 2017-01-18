var timestamp = require("../timestamp.js");
module.exports = DocumentEditor;
function DocumentEditor(){}
DocumentEditor.prototype.view = __dirname;

DocumentEditor.prototype.create = function(){
  var model = this.model;
  var app = this.app;

  // Generates a UUID then strips dashes.
  function generateDocumentId(){
    return model.id().replace(/-/g, "");
  }

  this.createDocument = function (){
    var doc = model.get("document");
    doc.id = generateDocumentId();
    doc.createdDate = timestamp();
    doc.updatedDate = doc.createdDate;
    doc.views = 0;
    doc.content = "";

    app.model.add("beta_documents", doc, function (err){
      if(err){ console.log(err); }
      app.history.push("/beta/" + doc.id + "/edit");
    });
  };
}
