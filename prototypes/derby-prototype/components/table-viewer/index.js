var Scrollgrid = require("../../lib/scrollgrid.v0.2.1.js");
var d3 = require("d3-dsv");

module.exports = TableViewer;

function TableViewer(){}

TableViewer.prototype.view = __dirname;

TableViewer.prototype.create = function(){
  var model = this.model;

  var table = Scrollgrid.init(this.tableContainer, {
    autoResize: true,
    headerRows: 1,
    footerRows: 0,
    formatRules: []
  });

  function updateTable(csvString){
    var data = d3.csvParse(csvString);
    table.data(Scrollgrid.adapters.json(data));
  }

  // Set initial data.
  updateTable(model.get("csvString"));

  // Respond to changes on the data.
  var listener = model.on("change", "csvString", updateTable);

  this.on("destroy", function(){
    model.removeListener("change", listener);
  });

};
