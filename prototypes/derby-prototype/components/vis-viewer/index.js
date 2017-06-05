module.exports = VisViewer;
function VisViewer(){}
VisViewer.prototype.view = __dirname;

VisViewer.prototype.create = function(){
  var model = this.model;
  var app = this.app;

  var visViewerIFrame = this.visViewerIFrame;

  function postMessage(name, content){
    visViewerIFrame.contentWindow.postMessage({
      name: name,
      content: content
    }, "*");
  }

  var associatedDatasets = model.get("document.associatedDatasets");
  if(associatedDatasets){
    associatedDatasets.forEach(function (d){
      var id = d.id;
      var name = d.name;
      var doc = app.model.at("beta_documents." + id);
      doc.subscribe(function(err) {
        if(err){ return console.log(err); }

        // Post initially loaded content.
        postMessage(name, doc.get("content"));
        
        // Post content when the dataset content changes.
        doc.on("change", "content", function (){
          postMessage(name, doc.get("content"));
        });

        // Post message whenever the visualization content (iframe srcdoc) changes.
        visViewerIFrame.addEventListener("load", function (){
          postMessage(name, doc.get("content"));
        });
      });
    });
  }

  // Code in the iFrame:
  // window.addEventListener("message", function (e){
  //   console.log(e.data);
  // }, false);

};

