var read = require('./read');

module.exports = function (id, callback){

  console.log('');

  casper.test.begin('Update', 5, function(test) {
    casper.start('http://localhost:3000/' + id + '/edit', function() {
      test.assertTitle('testTitle', 'Page title matches');

      // Trigger the change to be sent via WebSocket to ShareDB server.
      this.evaluate(function() {

        $('#title-input').val('newTitle')[0]
          .dispatchEvent(new Event('input'));

        $('#description-input').val('newDescription')[0]
          .dispatchEvent(new Event('input'));
      });

      // Assert that the title on the page updates instantly.
      // Use waitFor to avoid race condition.
      this.waitFor(function (){
        return this.getTitle() === 'newTitle';
      }, function (){
        test.assertTitle('newTitle', 'Page title syncs');
      });
    });

    // Assert that the changes were persisted to the backend,
    // and that the server-rendered data matches the updated values.
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
