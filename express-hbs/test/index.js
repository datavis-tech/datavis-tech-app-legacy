var home = require('./home');
var create = require('./create');
var read = require('./read');

function phase1(){
  home(function (){
    create(function (id){
      phase2(id);
    });
  });
}

function phase2(id){
  read(id, function (){
    console.log('');
  });
}

// Kick off the tests.
phase1();
