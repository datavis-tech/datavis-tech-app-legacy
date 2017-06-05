var camelCase = require("camelcase");
module.exports = DatasetAssociator;
function DatasetAssociator(){}
DatasetAssociator.prototype.view = __dirname;
DatasetAssociator.prototype.create = function(){
  var model = this.model;
  var app = this.app;
  var setIdValidationStatus = this.setIdValidationStatus.bind(this);

  this.associatedDatasets = model.at("document.associatedDatasets");

  // Initially only show the "Associate Dataset" button.
  // Clicking on the button shows the form inline on the page.
  model.set("showingForm", false);

  var idListener = model.on("change", "datasetId", function (datasetId){
    setIdValidationStatus("Validating id.");
    model.set("datasetIdSpinner", true);

    // add a delay for manual testing
    setTimeout(function (){
      var docModel = app.model.at("beta_documents_list." + datasetId);
      docModel.fetch(function (err){
        var doc = docModel.get();
        if(doc){
          if(doc.type !== "data"){
            setIdValidationStatus("There is a document for the given id, but it is not a dataset.", "danger");
          } else {
            setIdValidationStatus("Successfully validated dataset id as \"" + doc.title + "\".", "success");
            model.set("datasetName", camelCase(doc.title));
          }
        } else {
          setIdValidationStatus("There is no dataset with the given id.", "danger");
        }
      });
    }, 500);
  });

  this.on("destroy", function(){
    model.removeListener("change", idListener);
  });
};

// Sets the validation status.
// message - the string to display
// state - one of Bootstrap's contextual names, in the set {success, warning, danger}
//   Can also be empty for normal styling.
DatasetAssociator.prototype.setIdValidationStatus = function (message, state) {
  this.model.set("datasetIdMessage", message);
  this.model.set("datasetIdMessageClass", state ? "text-" + state : "");
  this.model.set("datasetIdInputClass", state ? "form-control-" + state : "");
  this.model.set("datasetIdFormGroupClass", state ? "has-" + state : "");
  this.model.set("datasetIdSpinner", false);
  this.model.set("datasetIdIsValid", state === "success" ? true : false);
}

DatasetAssociator.prototype.showForm = function (){
  var model = this.model;

  // Clear out old values in case this is the second time associating a dataset.
  model.set("datasetId", "");
  model.set("datasetName", "");

  // Set an empty validation message and normal styling.
  this.setIdValidationStatus("");

  // Display the form.
  model.set("showingForm", true);
};

DatasetAssociator.prototype.associateDataset = function (){
  var model = this.model;
  this.associatedDatasets.push({
    id: model.get("datasetId"),
    name: model.get("datasetName")
  });
  model.set("showingForm", false);
};

DatasetAssociator.prototype.removeAssociatedDataset = function (index){
  var associatedDatasets = this.associatedDatasets;
  setTimeout(function (){
    associatedDatasets.remove(index);
  });
};


