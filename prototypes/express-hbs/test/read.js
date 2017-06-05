function assertDoc(test, data){
  test.assertTitle(data.title, 'Page title matches');

  test.assertEval(function(data) {
    return $('#doc-title').text() === data.title;
  }, 'Rendered document title matches', data);

  test.assertEval(function(data) {
    return $('#doc-description').text() === data.description;
  }, 'Rendered document description matches', data);
}

function read(id, callback){

  console.log('');

  casper.test.begin('Read', 3, function(test) {
    casper.start('http://localhost:3000/' + id, function() {
      assertDoc(test, {
        title: 'testTitle',
        description: 'testDescription'
      });
    });
    
    casper.run(function() {
      test.done();
      callback(id);
    });
  });
}

read.assertDoc = assertDoc;

module.exports = read;
