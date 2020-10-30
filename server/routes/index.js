const router = require('express').Router();

// API Routes
const apiRoute = require('./api');
router.use('/api', apiRoute);

// Auth Routes
const authRoute = require('./auth');
router.use('/auth', authRoute);

module.exports = router;
