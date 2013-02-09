
/*
 * GET home page.
 */
var superagent = require('superagent');

exports.index = function(req, res){
  
  // if (req.isAuthenticated()) {
    // superagent.get('https://api.github.com/repos/fs-webdev/home/contents/package.json')
    // .set('Accept', 'application/vnd.github.raw+json')
    superagent.get('https://api.github.com/users/nicjohnson/orgs')
    .auth(req.user.accessToken, 'x-oauth-basic')
    .end(function(data) {
      if(data.ok) {
        console.log(data.body);
      } else {
        console.log(data.text);
      }
    });
  // }
  res.render('index', {user: req.user});
};