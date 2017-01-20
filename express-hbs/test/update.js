module.exports = function (id, callback){

  console.log('');

  casper.test.begin('Update', 2, function(test) {
    casper.start('http://localhost:3000/' + id + '/edit', function() {
      test.assertTitle('testTitle', 'Page title matches');
    });

    // Trigger the change to be sent via WebSocket to ShareDB server.
    casper.thenEvaluate(function() {
      var el = document.getElementById('title-input');
      el.value = 'newTitle';
      el.dispatchEvent(new Event('input'));
    });

    casper.thenOpen('http://localhost:3000/' + id, function() {
      test.assertTitle('newTitle', 'Page title updated');
    });
    
    casper.run(function() {
      test.done();
      callback();
    });
  });
}
