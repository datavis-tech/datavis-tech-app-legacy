var home = require('./home');
var create = require('./create');

function phase1(){
  console.log('\nPhase 1');
  home(function (){
    create(function (id){
      phase2(id);
    });
  });
}

function phase2(id){
  //console.log('\nPhase 2\nid = ' + id);
}

// Kick off the tests.
phase1();
