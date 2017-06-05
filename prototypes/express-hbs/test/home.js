module.exports = function (callback){

  console.log('');

  casper.test.begin('Home', 2, function(test) {
    casper.start('http://localhost:3000/', function() {
      test.assertTitle('Datavis Tech', 'Title is correct');
      test.assertExists('form[action="create"]', 'Create form is found');
    });
    
    casper.run(function() {
      test.done();
      callback();
    });
  });
}
