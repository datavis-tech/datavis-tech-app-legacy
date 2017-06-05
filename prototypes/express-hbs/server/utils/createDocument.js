// This module provides a function that creates a new
// document in ShareDB.
function createDocument(connection, id, data, callback){

  data.content = [
    '<!DOCTYPE html>',
    '<html>',
    '  <head>',
    '    <meta charset="utf-8">',
    '    <meta name="viewport" content="width=device-width">',
    '    <title>Example</title>',
    '    <script src="https://d3js.org/d3.v4.min.js"></script>',
    '  </head>',
    '  <body>',
    '    <script>',
    '      d3.select("body")',
    '        .append("h1")',
    '          .text("Hello World!");',
    '    </script>',
    '  </body>',
    '</html>'
  ].join('\n');

  var doc = connection.get('documents', id);
  doc.create(data, callback);
}

module.exports = createDocument;
