
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , util = require('util')
  , passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy
  , proxy = require('simple-http-proxy')
  , path = require('path');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
    // clientID: '5a821c5ca41b1a27d65b',
    // clientSecret: '0902b4d912625069bbcb33f3e49eee295d480951',
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.HOST_NAME + "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, {"accessToken": accessToken, "refreshToken": refreshToken, "profile": profile});
    });
  }
));

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(express['static'](path.join(__dirname, 'build')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use("/api", proxy("https://familysearch.org/artifactmanager"));
  // app.use("/api", proxy("https://api.github.com"));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/auth/github',
  passport.authenticate('github', { scope: 'repo' }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/login', ensureAuthenticated, function(req, res){
  // res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/github');
}

if(!process.env.STARTUP) {
  app.listen(app.get('port'));
}