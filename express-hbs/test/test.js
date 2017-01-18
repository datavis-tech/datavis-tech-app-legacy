casper.test.begin('Home Page', 1, function(test) {
  var root = 'http://localhost:3000/';

  casper.start(root, function() {
    this.echo(this.getTitle());
    test.assertEquals(this.getTitle(), 'Datavis Tech');
    test.done();
  }).run(function() {
    test.done();
  });

});
