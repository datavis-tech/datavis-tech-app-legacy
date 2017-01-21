// Constructs the data bundle string.
// Create so the serialization could be changed in one place
// if required (e.g. optimize for size in production).
module.exports = function (data){
  return JSON.stringify(data, null, 2);
};
