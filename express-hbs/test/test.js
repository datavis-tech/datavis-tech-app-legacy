casper.test.begin('Home Page', 3, function(test) {
  var root = 'http://localhost:3000/';

  casper.start(root, function() {
    this.echo(this.getTitle());
    test.assertTitle('Datavis Tech', 'Title is correct');
    test.assertExists('form[action="create"]', 'Create form is found');

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

    test.assertEqual(url.length, 58);

    // Extract the id of the document.
    var id = url.substr(22);

    console.log(url);
    // Draws from http://docs.casperjs.org/en/latest/testing.html#testing
    //test.assertTitle("casperjs - Recherche Google", "google title is ok");
    //test.assertUrlMatch(/q=casperjs/, "search term has been submitted");
    //test.assertEval(function() {
    //  return __utils__.findAll("h3.r").length >= 10;
    //}, "google search for \"casperjs\" retrieves 10 or more results");
  });
  
  casper.run(function() {
    test.done();
  });

});
