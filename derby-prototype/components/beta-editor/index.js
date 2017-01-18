var timestamp = require("../timestamp.js");
module.exports = DocumentEditor;
function DocumentEditor(){}
DocumentEditor.prototype.view = __dirname;

// Set up the "Saving..." -> "Saved." functionality.
DocumentEditor.prototype.create = function(){
  var model = this.model;
  var timeout;

  var listener = model.on("change", "document.**", function (){
    model.set("_page.savingMessage", "Saving...");

    // TODO set updatedDate here

    clearTimeout(timeout);
    model.whenNothingPending(function (){
      model.set("_page.savingMessage", "All changes saved.")
      timeout = setTimeout(function (){
        model.set("_page.savingMessage", "");
      }, 1500);
    });
  });

  this.on("destroy", function(){
    model.removeListener("change", listener);
  });
}
