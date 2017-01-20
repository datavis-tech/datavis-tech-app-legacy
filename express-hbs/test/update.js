module.exports = function (id, callback){

  console.log('');

  casper.test.begin('Update', 1, function(test) {
    casper.start('http://localhost:3000/' + id + '/edit', function() {

      test.assertTitle('testTitle', 'Page title matches');

      //test.assertEval(function() {
      //  return $('#doc-title').text() === 'testTitle';
      //}, 'Rendered document title matches');

      //test.assertEval(function() {
      //  return $('#doc-description').text() === 'testDescription';
      //}, 'Rendered document description matches');

    });
    
    casper.run(function() {
      test.done();
      callback();
    });
  });
}
