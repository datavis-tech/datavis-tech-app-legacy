module.exports = function (callback){
  console.log("");
  casper.test.begin('Document Creation', 2, function(test) {
    var id;

    // Submit the form to create a new document.
    casper.start('http://localhost:3000/', function() {
      this.fill('form[action="create"]', {
        title: "testTitle",
        description: "testDescription"
      }, true);
    });

    // At this point a new document should have been created.
    casper.then(function() {

      // The URL should be something like this
      // http://localhost:3000/b84819e8-04cd-45ca-aa4d-b5e47181da68/edit
      var url = this.getCurrentUrl();

      test.assertEqual(url.length, 63, 'Document was created, redirect occurred');

      test.assertEqual(url.substr(59), 'edit', 'URL ends with /edit');

      // Extract the id of the document.
      id = url.substr(22, 36);

      // TODO move these to a test for the document listing page.
      //test.assertTitle('testTitle', 'Page title matches');

      //test.assertEval(function() {
      //  return $('#doc-title').text() === 'testTitle';
      //}, 'Rendered document title matches');

      //test.assertEval(function() {
      //  return $('#doc-description').text() === 'testDescription';
      //}, 'Rendered document description matches');

    });
    
    casper.run(function() {
      test.done();
      callback(id);
    });
  });
}
