var superagent = require('superagent');
var domready = require('domready');
var cookie = require('cookie');
var json = require('json');

var accessToken = cookie('accessToken');
var org = '';

if (typeof accessToken !== 'undefined') {
  superagent.get('https://api.github.com/orgs/fs-webdev/repos')
  .set('Authorization', 'bearer ' + accessToken)
  .end(function(data) {
    domready(function() {
      for (var i = 0; i < data.body.length; i++) {
        getPackageContents(data.body[i].name, 'fs-webdev');
      }
    });
  });

  // superagent.get('https://api.github.com/orgs/FamilySearch/repos')
  // .set('Authorization', 'bearer ' + accessToken)
  // .end(function(data) {
  //   domready(function() {
  //     for (var i = 0; i < data.body.length; i++) {
  //       getPackageContents(data.body[i].name, 'FamilySearch');
  //     }
  //   });
  // });
}

function getPackageContents (repoName, org) {
      var repoList = document.getElementById('repos');

      superagent.get('https://api.github.com/repos/' + org + '/' + repoName + '/contents/package.json')
      .set('Accept', 'application/vnd.github.raw+json')
      .set('Authorization', 'bearer ' + accessToken)
      .end(function(data) {
        if (data.ok) {
          var repo = {};
          try {
            repo = json.parse(data.text);
          } catch(ex) {
            console.log('ex:', ex);
          }

          // if (repo.dependencies && repo.dependencies !== null && typeof repo.dependencies['shared-ui'] !== 'undefined') {
          if (repo.dependencies && repo.dependencies !== null) {
            var tr = document.createElement('tr');
            var nameTr = document.createElement('td');
            var SUITr = document.createElement('td');
            var WoodruffTr = document.createElement('td');
            var ThemeTr = document.createElement('td');
            nameTr.appendChild(document.createTextNode(repo.name));
            nameTr.className = 'name';
            SUITr.appendChild(document.createTextNode(repo.dependencies['shared-ui']));
            WoodruffTr.appendChild(document.createTextNode(repo.dependencies['woodruff']));
            ThemeTr.appendChild(document.createTextNode(repo.dependencies['theme-engage']));
            tr.appendChild(nameTr);
            tr.appendChild(SUITr);
            tr.appendChild(WoodruffTr);
            tr.appendChild(ThemeTr);
            repoList.appendChild(tr);
          }

        }
      });
}