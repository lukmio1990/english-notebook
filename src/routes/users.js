const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');

const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');

// Logowanie
router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post(
  '/users/signin',
  LoginController.validate,
  LoginController.checkValidation,
  passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin'
    // failureFlash: true
  })
);

//Rejestracja
router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post(
  '/users/signup',
  UserController.validate,
  UserController.checkValidation,
  async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const newUser = new User({ name, email, password, confirm_password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.redirect('/');
  }
);

router.get('/users/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
