const express = require('express');
const router = express.Router();

const User = require('../models/User');

const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');

//Logowanie
router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post(
  '/users/signin',
  LoginController.validate,
  LoginController.checkValidation,
  async (req, res) => {
    res.redirect('/');
  }
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
    console.log(name, email, password, confirm_password);

    const newUser = new User({ name, email, password, confirm_password });
    await newUser.save();
    res.redirect('/');
  }
);

module.exports = router;
