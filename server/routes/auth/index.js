const router = require('express').Router();
const login = require('./login');
const register = require('./register');

// Local Auth
router.post('/login', login);
router.post('/register', register);

// Google Auth

// Facebook Auth

module.exports = router;
