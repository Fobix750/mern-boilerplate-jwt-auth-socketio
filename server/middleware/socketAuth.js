const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");

const config = require("../config/config");

const secretOrKey = config.auth.jwtSecret;

const socketAuth = async (socket, next) => {
  const token = socket.handshake.query.token;
  if (!token) next();
  jwt.verify(token, secretOrKey, async (err, payload) => {
    if (err) next(new Error(err));
    try {
      const user = await User.findOne({ name: payload.sub });

      if (user) {
        socket.user = {
          _id,
          username,
          email,
          role,
          createdAt,
          updatedAt
        } = user;
        next();
      } else {
        console.log("User not found");
        next();
      }
    } catch (errUser) {
      next(new Error(errUser));
    }
  });
};

module.exports = socketAuth;
