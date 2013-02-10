function getData (url, req, res) {
    superagent.get(url)
    // superagent.get('https://api.github.com/repos/fs-webdev/home/readme')
    // superagent.get('https://api.github.com/repos/fs-webdev/home/contents/package.json')
    .set('Accept', 'application/vnd.github.raw+json')
    .auth(req.user.accessToken, 'x-oauth-basic')
    .end(function(data) {
      if(data.ok) {
        res.render('index', {user: req.user, myoutput: data.body});
        console.log(data.body);
      } else {
        res.render('index', {user: req.user, myoutput: data.text});
        console.log(data.text);
      }
    });
}

var superagent = require('superagent');

exports.index = function(req, res){

  if (req.isAuthenticated()) {
    // getData('https://api.github.com/orgs/fs-webdev/teams', req, res);
    getData('/github-api/teams/214925', req, res);
    // getData('https://api.github.com/users/nicjohnson', req, res);
    // getData('https://api.github.com/repos/fs-webdev/home/contents/package.json', req, res);
  } else {
    res.render('index', { user: req.user });
  }

};