var homePage = require('./homePage');
var documentCreation = require('./documentCreation');

homePage(function (){
  documentCreation(function (id){
    console.log('Document created with id ' + id);
  });
});
