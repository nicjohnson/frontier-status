exports.index = function(req, res){

  if (req.isAuthenticated()) {
    res.cookie('accessToken', req.user.accessToken, { maxAge: 900000000000 });
  }

  res.render('index', { user: req.user });

};