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
      test.assertTitle('newTitle', 'Page title updated');

      test.assertEval(function() {
        return $('#doc-title').text() === 'newTitle';
      }, 'Rendered document title matches');

      test.assertEval(function() {
        return $('#doc-description').text() === 'newDescription';
      }, 'Rendered document description matches');
    });
    
    casper.run(function() {
      test.done();
      callback();
    });
  });
}
