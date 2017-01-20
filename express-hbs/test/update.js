var read = require('./read');

module.exports = function (id, callback){

  console.log('');

  casper.test.begin('Update', 4, function(test) {
    casper.start('http://localhost:3000/' + id + '/edit', function() {
      test.assertTitle('testTitle', 'Page title matches');
    });

    // Trigger the change to be sent via WebSocket to ShareDB server.
    casper.thenEvaluate(function() {
      $('#title-input').val('newTitle')[0].dispatchEvent(new Event('input'));
      $('#description-input').val('newDescription')[0].dispatchEvent(new Event('input'));
    });

    casper.thenOpen('http://localhost:3000/' + id, function() {
      read.assertDoc(test, {
        title: 'newTitle',
        description: 'newDescription'
      });
    });
    
    casper.run(function() {
      test.done();
      callback();
    });
  });
}