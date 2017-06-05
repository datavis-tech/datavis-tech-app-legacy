// Constructs the data bundle string.
// Create so the serialization could be changed in one place
// if required (e.g. optimize for size in production).
module.exports = function (data){
  var json = JSON.stringify(data);

  // Replace instances of "</" with "<\/"
  // to avoid incorrect parsing of HTML embedded within JSON.
  // See https://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
  return json.replace(/<\//g, "<\\\/");
};
