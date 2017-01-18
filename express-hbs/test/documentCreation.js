function documentCreation(callback){
  casper.test.begin('Document Creation', 6, function(test) {
    var id;
    casper.start('http://localhost:3000/', function() {
      test.assertTitle('Datavis Tech', 'Title is correct');
      test.assertExists('form[action="create"]', 'Create form is found');

      // Submit the form to create a new document.
      this.fill('form[action="create"]', {
        title: "testTitle",
        description: "testDescription"
      }, true);
    });

    // At this point a new document should have been created.
    casper.then(function() {

      // The URL should be something like this
      // http://localhost:3000/b84819e8-04cd-45ca-aa4d-b5e47181da68
      var url = this.getCurrentUrl();

      test.assertEqual(url.length, 58, "Document was created, redirect occurred");

      // Extract the id of the document.
      id = url.substr(22);

      test.assertTitle('testTitle', 'Page title matches');

      test.assertEval(function() {
        return $('#doc-title').text() === 'testTitle';
      }, 'Rendered document title matches');

      test.assertEval(function() {
        return $('#doc-description').text() === 'testDescription';
      }, 'Rendered document description matches');

    });
    
    casper.run(function() {
      test.done();
      callback(id);
    });
  });
}
module.exports = documentCreation;
