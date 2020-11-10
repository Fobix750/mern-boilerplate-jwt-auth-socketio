const fs = require("fs");
const path = require("path");
const config = require("../config/config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("mongoose").model("User");

const secretOrKey = config.auth.jwtSecret;

const strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({ name: payload.sub });

      if (user) {
        done(
          null,
          ({ _id, username, email, role, createdAt, updatedAt } = user)
        );
      } else {
        console.log("User not found");
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
