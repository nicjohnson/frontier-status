exports.index = function(req, res){

  // console.log(req.cookies.accessToken !== undefined);

  // if (req.cookies.accessToken !== undefined) {
    if (req.isAuthenticated()) {
      console.log(req.user.accessToken);
      res.cookie('accessToken', req.user.accessToken, { maxAge: 900000000000 });
      // res.cookie('accessToken', req.user.accessToken, { secure: true });
    }
  // }

  res.render('index', { user: req.user });

};