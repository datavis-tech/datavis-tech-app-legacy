module.exports = function (id, callback){

  console.log('');

  casper.test.begin('Update', 2, function(test) {
    casper.start('http://localhost:3000/' + id + '/edit', function() {
      test.assertTitle('testTitle', 'Page title matches');
    });

    casper.waitFor(function() { 
      return this.evaluate(function(){
        return $('#title-input').val() === 'testTitle';
      });
    }, function() { 
      this.echo('testTitle set'); 
    });

    casper.thenEvaluate(function() {

      var el = document.getElementById('title-input');
      el.value = 'newTitle';
      el.dispatchEvent(new Event('input'));

      setTimeout(function (){
        window.titleSet = true;
      }, 500);
    });

    casper.waitFor(function() { 
      return this.getGlobal('titleSet'); 
    }, function() { 
      this.echo('titleSet flag has been set');
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
