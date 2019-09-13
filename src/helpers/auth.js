const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'Podany login lub hasło jest nieprawidłowe.');
    next();
  }
  res.redirect('/users/signin');
};

module.exports = helpers;
