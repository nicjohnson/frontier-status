var superagent = require('superagent');

superagent.get('https://familysearch.org/artifactmanager/albums/480/artifacts?bogus=false&maxRecords=5')
  .end(function(data) {
    alert(data);
  });