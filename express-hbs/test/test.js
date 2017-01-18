casper.test.begin('Home Page', 2, function(test) {
  var root = 'http://localhost:3000/';

  casper.start(root, function() {
    this.echo(this.getTitle());
    test.assertTitle('Datavis Tech', 'Title is correct');
    test.assertExists('form[action="create"]', 'Create form is found');
    test.done();
  });

//this.fill('form[action="/search"]', {
//  q: "casperjs"
//}, true);
  
  casper.run(function() {
    test.done();
  });

});
