const router = require('express').Router();
const passport = require('passport');

router.post(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res
      .status(200)
      .send('If you get this data, you have been authenticated via JWT!');
  }
);

router.get('/getUsername', require('./getUsername'));

module.exports = router;
