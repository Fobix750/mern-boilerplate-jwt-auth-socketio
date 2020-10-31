const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('mongoose').model('User');

const mode = process.env.NODE_ENV || 'production';
const secretOrKey =
  mode === 'production' ? process.env.JWT_KEY_PROD : process.env.JWT_KEY_DEV;

const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({ name: payload.sub });

      if (user) {
        done(null, user);
      } else {
        console.log('User not found');
        done(null, false);
      }
    } catch (err) {
      console.log(err);
      done(err, false);
    }
  }
);

module.exports = (passport) => {
  passport.use(strategy);
};
