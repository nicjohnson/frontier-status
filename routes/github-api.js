function sendData (url, req, res) {
    superagent.get(url)
    // superagent.get('https://api.github.com/repos/fs-webdev/home/readme')
    // superagent.get('https://api.github.com/repos/fs-webdev/home/contents/package.json')
    .set('Accept', 'application/vnd.github.raw+json')
    .auth(req.user.accessToken, 'x-oauth-basic')
    .end(function(data) {
      if(data.ok) {
        res.send(data.body);
        console.log(data.body);
      } else {
        res.send(data.text);
        // console.log(data.text);
      }
    });
}

var superagent = require('superagent');

exports.repos = function(req, res){

  if (req.isAuthenticated()) {
    sendData('https://api.github.com/orgs/fs-webdev/repos', req, res);
  } else {
    res.send(401, 'Please authenticate.');
  }

};