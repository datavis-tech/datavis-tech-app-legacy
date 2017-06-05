function changed(ops, property){
  return ops.some(function (op){
    return op.p[0] === property;
  });
}

module.exports = changed;
