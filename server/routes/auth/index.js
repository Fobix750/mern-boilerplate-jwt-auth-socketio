const router = require('express').Router();
const passport = require('passport');

const login = require('./login');
const register = require('./register');
const checkAuth = require('./checkAuth');

// Authenticate user
router.post(
  '/checkAuth',
  passport.authenticate('jwt', { session: false }),
  checkAuth
);

// Local Auth
router.post('/login', login);
router.post('/register', register);

// Google Auth

// Facebook Auth

module.exports = router;
