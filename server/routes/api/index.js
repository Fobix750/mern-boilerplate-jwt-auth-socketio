const router = require('express').Router();
const passport = require('passport');

router.post(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).send('Auth Successfull');
  }
);

router.get('/getUsername', require('./getUsername'));

module.exports = router;
